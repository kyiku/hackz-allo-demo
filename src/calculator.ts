/**
 * 演算種別で拡張可能な calculator。
 * 新しい演算は operations マップにエントリを追加するだけで対応できる。
 */

/** 2項演算の関数シグネチャ */
export type BinaryOperation = (a: number, b: number) => number

/** 演算種別 -> 実装 のマップ。ここに追加すれば calculate が対応する。 */
export const operations: Record<string, BinaryOperation> = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  div: (a, b) => {
    if (b === 0) {
      throw new Error('division by zero')
    }
    return a / b
  },
}

/** サポートする演算種別 */
export type Op = keyof typeof operations

/**
 * 演算種別を指定して計算する。
 * @throws 未知の op が渡された場合に Error をスローする。
 */
export function calculate(op: Op, a: number, b: number): number {
  const operation = operations[op]
  if (!operation) {
    throw new Error(`Unknown operation: ${op}`)
  }
  return operation(a, b)
}

// 後方互換のための薄いラッパー
export function add(a: number, b: number): number {
  return calculate('add', a, b)
}

export function subtract(a: number, b: number): number {
  return calculate('sub', a, b)
}

/**
 * a を b で除算する。
 * @throws b が 0 のとき 'division by zero' を含むメッセージの Error をスローする。
 */
export function divide(a: number, b: number): number {
  return calculate('div', a, b)
}

/**
 * n の2倍を返す。
 * @example double(4) // => 8
 */
export function double(n: number): number {
  return n * 2
}
