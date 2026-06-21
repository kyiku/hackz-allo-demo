/**
 * 数値配列の合計を返す。空配列は 0。
 *
 * @example
 * sum([1, 2, 3]) // => 6
 * sum([])        // => 0
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}
