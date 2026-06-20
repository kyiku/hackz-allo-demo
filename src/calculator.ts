/**
 * デモ用の計算ロジック。
 * 演算種別ごとの実装をテーブルに集約し、新しい演算を追加しやすくしている。
 */

/** サポートする演算種別 */
export type Operation = 'add' | 'sub'

/** 演算種別 -> 実装 のテーブル。新しい演算はここに追加するだけで拡張できる。 */
const operations: Record<Operation, (a: number, b: number) => number> = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
}

/**
 * 指定した演算種別で a, b を計算する。
 * @throws 未知の演算種別を渡した場合
 */
export function calculate(op: Operation, a: number, b: number): number {
  const fn = operations[op]
  if (!fn) {
    throw new Error(`Unknown operation: ${op}`)
  }
  return fn(a, b)
}

export function add(a: number, b: number): number {
  return calculate('add', a, b)
}

export function subtract(a: number, b: number): number {
  return calculate('sub', a, b)
}
