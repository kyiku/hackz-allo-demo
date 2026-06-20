import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { add, divide, subtract } from '../src/calculator'
import { evalExpression } from '../src/expression'

const here = dirname(fileURLToPath(import.meta.url))
const readmePath = resolve(here, '../README.md')
const readme = readFileSync(readmePath, 'utf8')

/** README から指定見出し（##）配下の本文を抜き出す。次の同レベル以上の見出しまで。 */
function extractSection(markdown: string, headingMatcher: RegExp): string | null {
  const lines = markdown.split('\n')
  let start = -1
  for (let i = 0; i < lines.length; i++) {
    const m = /^(#{1,6})\s+(.*)$/.exec(lines[i])
    if (m && m[1].length === 2 && headingMatcher.test(m[2])) {
      start = i
      break
    }
  }
  if (start === -1) return null

  const body: string[] = []
  for (let i = start + 1; i < lines.length; i++) {
    const m = /^(#{1,6})\s+/.exec(lines[i])
    if (m && m[1].length <= 2) break // 次の h1/h2 で終了
    body.push(lines[i])
  }
  return body.join('\n')
}

/** マークダウン本文からフェンスドコードブロックの中身を全て抜き出す。 */
function extractCodeBlocks(markdown: string): string[] {
  const blocks: string[] = []
  const re = /```[^\n]*\n([\s\S]*?)```/g
  let m: RegExpExecArray | null
  while ((m = re.exec(markdown)) !== null) {
    blocks.push(m[1])
  }
  return blocks
}

describe('README Usage セクション', () => {
  const usage = extractSection(readme, /usage|使い方|使用方法/i)

  it('1. README.md に「Usage」セクションが存在する', () => {
    expect(usage).not.toBeNull()
  })

  it('2. Usage セクションに少なくとも1つのコマンド例またはコードスニペットが含まれる', () => {
    expect(usage).not.toBeNull()
    const blocks = extractCodeBlocks(usage as string)
    expect(blocks.length).toBeGreaterThanOrEqual(1)
    // いずれかのブロックに実際の中身があること
    expect(blocks.some((b) => b.trim().length > 0)).toBe(true)
  })

  it('3. 記載されたコード例が実際に実行可能で正常に動作する', () => {
    // README の Usage に記載した代表例と同じ呼び出しを実行し、記載どおりの結果になることを検証する。
    expect(add(2, 3)).toBe(5)
    expect(subtract(5, 3)).toBe(2)
    expect(divide(6, 3)).toBe(2)
    expect(evalExpression('1 + 2 * 3')).toBe(7)

    // README の Usage に書かれた「実行結果コメント (=> 値)」が実コードと一致することを検証する。
    const usageText = usage as string
    const exampleResults: Array<[RegExp, number]> = [
      [/add\(2,\s*3\)[^\n]*?(?:=>|=|→)\s*5\b/, add(2, 3)],
      [/evalExpression\(['"]1 \+ 2 \* 3['"]\)[^\n]*?(?:=>|=|→)\s*7\b/, evalExpression('1 + 2 * 3')],
    ]
    for (const [pattern, actual] of exampleResults) {
      const found = pattern.exec(usageText)
      expect(found, `README Usage に期待する実行例が見つからない: ${pattern}`).not.toBeNull()
      // パターン末尾の数値（記載値）と実コードの結果が一致すること
      const documented = Number((found as RegExpExecArray)[0].match(/(?:=>|=|→)\s*(\d+(?:\.\d+)?)\b/)?.[1])
      expect(documented).toBe(actual)
    }
  })

  it('4. Usage セクションに代表的なユースケースが1つ以上、具体例として記載されている', () => {
    const usageText = usage as string
    // このリポジトリの中核 API（calculator / expression）に言及する具体例があること
    const mentionsCalculator = /calculator|\badd\b|\bsubtract\b|\bdivide\b|\bcalculate\b/.test(usageText)
    const mentionsExpression = /evalExpression/.test(usageText)
    expect(mentionsCalculator || mentionsExpression).toBe(true)
  })

  it('5. 記載された例がコピー&ペーストでそのまま動作する形式（壊れたプレースホルダが無い）', () => {
    const usageText = usage as string
    const blocks = extractCodeBlocks(usageText)
    expect(blocks.length).toBeGreaterThanOrEqual(1)

    // 実コード例（import 文を含むブロック）には未置換プレースホルダが無いこと。
    const codeBlocks = blocks.filter((b) => /\bimport\b/.test(b))
    expect(codeBlocks.length).toBeGreaterThanOrEqual(1)
    for (const block of codeBlocks) {
      // <foo> / {{foo}} / TODO / FIXME / xxx のようなプレースホルダで壊れていないこと
      expect(/<[A-Za-z0-9_\- ]+>/.test(block), `未置換プレースホルダ <...> が残っている:\n${block}`).toBe(false)
      expect(/\{\{[^}]+\}\}/.test(block), `未置換プレースホルダ {{...}} が残っている:\n${block}`).toBe(false)
      expect(/TODO|FIXME|XXX/.test(block), `未完成マーカーが残っている:\n${block}`).toBe(false)
    }

    // 実コード例は実在の export からインポートしていること（壊れた import パスでない）
    const importsRealModule = codeBlocks.some(
      (b) => /from\s+['"][^'"]*\/src\/(calculator|expression)['"]/.test(b),
    )
    expect(importsRealModule).toBe(true)
  })
})
