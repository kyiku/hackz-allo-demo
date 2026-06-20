import { describe, expect, it } from 'vitest'
import { add, calculate, divide, subtract } from '../src/calculator'

describe('calculator', () => {
  it('add は2数を加算する', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('subtract は2数を減算する', () => {
    expect(subtract(5, 3)).toBe(2)
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
