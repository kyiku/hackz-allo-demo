/**
 * 文字列 `s` を `n` 回繰り返した文字列を返す。
 *
 * 入力検証を行い、負数・非整数の回数は `RangeError` を投げる（防壁）。
 * 連結処理はネイティブの `String.prototype.repeat` に委譲し、
 * 不要なループや一時確保を避けて性能を確保する（俊足）。
 *
 * @param s 繰り返す対象の文字列（空文字も許容する）
 * @param n 繰り返し回数（0 以上の整数）
 * @returns `s` を `n` 回連結した文字列。`n === 0` のときは空文字
 * @throws {RangeError} `n` が負数、または整数でない場合
 *
 * @example
 * repeat('ab', 3) // => 'ababab'
 * repeat('ab', 0) // => ''
 */
export function repeat(s: string, n: number): string {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`n は 0 以上の整数である必要があります: ${n}`)
  }
  return s.repeat(n)
}
