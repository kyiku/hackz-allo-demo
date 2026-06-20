import { describe, expect, it } from 'vitest'
import { add, calculate, divide, double, isEven, multiply, subtract } from '../src/calculator'

describe('add', () => {
  it('add は2数を加算する', () => {
    expect(add(2, 3)).toBe(5)
  })
})

describe('subtract', () => {
  it('subtract(5, 3) は 2 を返す', () => {
    expect(subtract(5, 3)).toBe(2)
  })

  it('subtract(3, 5) は -2 を返す（負の結果）', () => {
    expect(subtract(3, 5)).toBe(-2)
  })

  it('subtract(0, 0) は 0 を返す', () => {
    expect(subtract(0, 0)).toBe(0)
  })

  it('subtract(5, 0) は 5 を返す（ゼロの減算）', () => {
    expect(subtract(5, 0)).toBe(5)
  })

  it('subtract(-5, -3) は -2 を返す（負の数同士）', () => {
    expect(subtract(-5, -3)).toBe(-2)
  })

  it('subtract(-5, 3) は -8 を返す（負と正の混在）', () => {
    expect(subtract(-5, 3)).toBe(-8)
  })

  it('subtract(5, 5) は 0 を返す（同値で0）', () => {
    expect(subtract(5, 5)).toBe(0)
  })
})

describe('multiply', () => {
  // Issue #34 で必須の2ケース
  it('multiply(3, 4) は 12 を返す', () => {
    expect(multiply(3, 4)).toBe(12)
  })

  it('multiply(-2, 3) は -6 を返す（負の数で正しい符号）', () => {
    expect(multiply(-2, 3)).toBe(-6)
  })

  // 境界・補助ケース
  it('multiply(-2, -3) は 6 を返す（負同士は正）', () => {
    expect(multiply(-2, -3)).toBe(6)
  })

  it('multiply(7, 0) は 0 を返す（ゼロ乗算）', () => {
    expect(multiply(7, 0)).toBe(0)
  })

  it('multiply(1, 5) は 5 を返す（恒等元）', () => {
    expect(multiply(1, 5)).toBe(5)
  })
})

describe('calculate', () => {
  it("calculate('add', 2, 3) は 5 を返す", () => {
    expect(calculate('add', 2, 3)).toBe(5)
  })

  it("calculate('sub', 5, 3) は 2 を返す", () => {
    expect(calculate('sub', 5, 3)).toBe(2)
  })

  it("calculate('mul', 3, 4) は 12 を返す", () => {
    expect(calculate('mul', 3, 4)).toBe(12)
  })

  it('未知の op を渡すと例外をスローする', () => {
    // @ts-expect-error 未知の op を意図的に渡す
    expect(() => calculate('unknown', 1, 2)).toThrow()
  })
})

describe('double', () => {
  it('double(4) は 8 を返す', () => {
    expect(double(4)).toBe(8)
  })

  it('double(0) は 0 を返す', () => {
    expect(double(0)).toBe(0)
  })

  it('double(-3) は -6 を返す（負の数）', () => {
    expect(double(-3)).toBe(-6)
  })
})

describe('isEven', () => {
  // Issue #31 で必須の2ケース
  it('isEven(4) は true を返す', () => {
    expect(isEven(4)).toBe(true)
  })

  it('isEven(3) は false を返す', () => {
    expect(isEven(3)).toBe(false)
  })

  // 境界・防壁ケース
  it('isEven(0) は true を返す（ゼロは偶数）', () => {
    expect(isEven(0)).toBe(true)
  })

  it('isEven(-2) は true を返す（負の偶数）', () => {
    expect(isEven(-2)).toBe(true)
  })

  it('isEven(-3) は false を返す（負の奇数）', () => {
    expect(isEven(-3)).toBe(false)
  })

  it('整数でない値を渡すと例外をスローする', () => {
    expect(() => isEven(2.5)).toThrow()
  })

  it('NaN を渡すと例外をスローする', () => {
    expect(() => isEven(Number.NaN)).toThrow()
  })
})

describe('divide', () => {
  it('divide(6, 3) は 2 を返す', () => {
    expect(divide(6, 3)).toBe(2)
  })

  it('正の数同士の除算で正しい商を返す', () => {
    expect(divide(20, 4)).toBe(5)
    expect(divide(9, 2)).toBe(4.5)
  })

  it('b が 0 のとき例外をスローする', () => {
    expect(() => divide(1, 0)).toThrow()
  })

  it("b が 0 のときの例外メッセージに 'division by zero' を含む", () => {
    expect(() => divide(1, 0)).toThrow('division by zero')
  })
})
