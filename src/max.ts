/**
 * 2つの数値のうち大きい方を返す（同じならその値）。
 *
 * @example
 * max(3, 9) // => 9
 * max(-1, -5) // => -1
 * max(2, 2) // => 2
 */
export function max(a: number, b: number): number {
  return a >= b ? a : b
}
