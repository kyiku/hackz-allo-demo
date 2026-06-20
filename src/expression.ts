/**
 * ユーザー入力の数式を「安全に」評価するモジュール。
 *
 * eval / Function は任意コード実行（インジェクション）の危険があるため使用しない。
 * 代わりに、許可文字のみを受け付けるトークナイザと、演算子優先順位を尊重する
 * 再帰下降パーサで式を評価する。
 *
 * 許可するもの: 数値（小数含む）, 演算子 + - * /, 空白
 * 許可しないもの: 英字・括弧・セミコロン・その他すべての記号 → 例外
 */

/** 数式に許可される文字（数字・小数点・四則演算子・空白）のみ */
const ALLOWED_PATTERN = /^[0-9.+\-*/\s]+$/

type Token =
  | { type: 'number'; value: number }
  | { type: 'operator'; value: '+' | '-' | '*' | '/' }

/**
 * 入力文字列をトークン列に分解する。
 * @throws 許可されない文字や不正な数値が含まれる場合に Error をスローする。
 */
function tokenize(input: string): Token[] {
  if (!ALLOWED_PATTERN.test(input)) {
    throw new Error(`Invalid characters in expression: "${input}"`)
  }

  const tokens: Token[] = []
  let i = 0

  while (i < input.length) {
    const ch = input[i]

    // 空白はスキップ
    if (/\s/.test(ch)) {
      i++
      continue
    }

    // 演算子
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      tokens.push({ type: 'operator', value: ch })
      i++
      continue
    }

    // 数値（小数含む）
    if (/[0-9.]/.test(ch)) {
      let numStr = ''
      while (i < input.length && /[0-9.]/.test(input[i])) {
        numStr += input[i]
        i++
      }
      const value = Number(numStr)
      if (!Number.isFinite(value)) {
        throw new Error(`Invalid number: "${numStr}"`)
      }
      tokens.push({ type: 'number', value })
      continue
    }

    // ここには到達しないはず（ALLOWED_PATTERN で弾かれる）
    throw new Error(`Unexpected character: "${ch}"`)
  }

  if (tokens.length === 0) {
    throw new Error('Empty expression')
  }

  return tokens
}

/**
 * 再帰下降パーサ。
 * 文法（優先順位を表現）:
 *   expr   := term (('+' | '-') term)*
 *   term   := factor (('*' | '/') factor)*
 *   factor := number
 */
class Parser {
  private pos = 0

  constructor(private readonly tokens: Token[]) {}

  parse(): number {
    const result = this.parseExpr()
    if (this.pos !== this.tokens.length) {
      throw new Error('Unexpected trailing tokens in expression')
    }
    return result
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos]
  }

  private parseExpr(): number {
    let value = this.parseTerm()
    let token = this.peek()
    while (token && token.type === 'operator' && (token.value === '+' || token.value === '-')) {
      this.pos++
      const right = this.parseTerm()
      value = token.value === '+' ? value + right : value - right
      token = this.peek()
    }
    return value
  }

  private parseTerm(): number {
    let value = this.parseFactor()
    let token = this.peek()
    while (token && token.type === 'operator' && (token.value === '*' || token.value === '/')) {
      this.pos++
      const right = this.parseFactor()
      if (token.value === '/') {
        if (right === 0) {
          throw new Error('division by zero')
        }
        value = value / right
      } else {
        value = value * right
      }
      token = this.peek()
    }
    return value
  }

  private parseFactor(): number {
    const token = this.peek()
    if (!token || token.type !== 'number') {
      throw new Error('Expected a number in expression')
    }
    this.pos++
    return token.value
  }
}

/**
 * 文字列の数式を安全に評価する。
 *
 * @param expression 評価する数式（例: '1 + 2 * 3'）
 * @returns 計算結果
 * @throws 不正な文字・不正な構文・ゼロ除算・空式の場合に Error をスローする。
 */
export function evalExpression(expression: string): number {
  const tokens = tokenize(expression)
  return new Parser(tokens).parse()
}
