/**
 * 演算種別で拡張可能な calculator。
 *
 * 演算を `operations` マップに集約することで、
 * 新しい演算種別はマップへ1エントリ追加するだけで拡張できる。
 */
export type Operation = (a: number, b: number) => number

const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
} satisfies Record<string, Operation>

export type OperationKind = keyof typeof operations

/**
 * 指定された演算種別で a, b を計算する。
 * @throws 未知の演算種別が渡された場合に例外をスローする。
 */
export function calculate(op: OperationKind, a: number, b: number): number {
  const operation = operations[op]
  if (!operation) {
    throw new Error(`Unknown operation: ${op}`)
  }
  return operation(a, b)
}
