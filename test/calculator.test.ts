import { describe, expect, it } from 'vitest'
import { add, calculate, subtract } from '../src/calculator'

describe('calculator', () => {
  it('add は2数を加算する', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('subtract は2数を減算する', () => {
    expect(subtract(5, 3)).toBe(2)
  })
})

describe('calculate', () => {
  it("calculate('add', 2, 3) が 5 を返すこと", () => {
    expect(calculate('add', 2, 3)).toBe(5)
  })

  it("calculate('sub', 5, 3) が 2 を返すこと", () => {
    expect(calculate('sub', 5, 3)).toBe(2)
  })

  it('未知の op を渡すと例外をスローすること', () => {
    // @ts-expect-error 未知の演算種別を意図的に渡す
    expect(() => calculate('mul', 2, 3)).toThrow()
  })
})
