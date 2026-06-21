/**
 * value を [min, max] の範囲に収めて返す。
 *
 * @example
 * clamp(5, 0, 10)   // → 5
 * clamp(-3, 0, 10)  // → 0
 * clamp(99, 0, 10)  // → 10
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
