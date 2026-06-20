/**
 * デモ用の最小ロジック。CIが緑になるベースライン。
 *
 * 演算は `calculate(op, a, b)` に集約し、演算種別ごとの実装は
 * `operations` テーブルで管理する。新しい演算を追加する場合は
 * このテーブルにエントリを足すだけで拡張できる。
 */

/** サポートする演算種別 */
export type Operation = 'add' | 'sub'

/** 演算種別 -> 二項演算の対応表 */
const operations: Record<Operation, (a: number, b: number) => number> = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
}

/**
 * 指定した演算種別で2数を計算する。
 * @throws 未知の演算種別が渡された場合に例外をスローする。
 */
export function calculate(op: Operation, a: number, b: number): number {
  const fn = operations[op]
  if (!fn) {
    throw new Error(`Unknown operation: ${op}`)
  }
  return fn(a, b)
}

/** 後方互換のための加算ヘルパー。 */
export function add(a: number, b: number): number {
  return calculate('add', a, b)
}

/** 後方互換のための減算ヘルパー。 */
export function subtract(a: number, b: number): number {
  return calculate('sub', a, b)
}
