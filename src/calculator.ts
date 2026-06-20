/**
 * デモ用の計算ロジック。
 *
 * 演算は `operations` マップに登録することで種別ごとに拡張可能。
 * 新しい演算を追加したい場合は `operations` にエントリを足すだけでよい。
 */

/** 二項演算の関数シグネチャ。 */
type BinaryOp = (a: number, b: number) => number

/**
 * 演算種別 -> 二項演算関数 のマップ。
 * ここが計算ロジックの単一の情報源（single source of truth）。
 */
const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
} satisfies Record<string, BinaryOp>

/** サポートする演算種別。 */
export type Operation = keyof typeof operations

/**
 * 演算種別 `op` に応じて `a` と `b` を計算する。
 * 未知の演算種別が渡された場合は例外を投げる。
 */
export function calculate(op: Operation, a: number, b: number): number {
  const fn: BinaryOp | undefined = operations[op]
  if (!fn) {
    throw new Error(`Unknown operation: ${op}`)
  }
  return fn(a, b)
}

/** 後方互換のための薄いラッパー。実体は `calculate('add', ...)`。 */
export function add(a: number, b: number): number {
  return calculate('add', a, b)
}

/** 後方互換のための薄いラッパー。実体は `calculate('sub', ...)`。 */
export function subtract(a: number, b: number): number {
  return calculate('sub', a, b)
}
