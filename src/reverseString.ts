/**
 * 与えられた文字列を反転して返す。
 *
 * Unicode のサロゲートペア（絵文字など）を壊さないよう、
 * コードポイント単位で反転する（`split('')` は使わない）。
 *
 * @param s 反転対象の文字列（空文字も許容する）
 * @returns 文字順を反転した文字列
 *
 * @example
 * reverseString('abc') // => 'cba'
 * reverseString('')    // => ''
 */
export function reverseString(s: string): string {
  return Array.from(s).reverse().join('')
}
