import { describe, expect, it } from 'vitest'
import { add, calculate, divide, subtract } from '../src/calculator'

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

describe('calculate', () => {
  it("calculate('add', 2, 3) は 5 を返す", () => {
    expect(calculate('add', 2, 3)).toBe(5)
  })

  it("calculate('sub', 5, 3) は 2 を返す", () => {
    expect(calculate('sub', 5, 3)).toBe(2)
  })

  it('未知の op を渡すと例外をスローする', () => {
    // @ts-expect-error 未知の op を意図的に渡す
    expect(() => calculate('unknown', 1, 2)).toThrow()
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
