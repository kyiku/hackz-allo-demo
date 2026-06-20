import { describe, expect, it } from 'vitest'
import { add, divide, subtract } from '../src/calculator'

describe('calculator', () => {
  it('add は2数を加算する', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('subtract は2数を減算する', () => {
    expect(subtract(5, 3)).toBe(2)
  })
})

describe('divide', () => {
  it('divide(6, 3) は 2 を返す', () => {
    expect(divide(6, 3)).toBe(2)
  })

  it('b が 0 のとき例外を投げる', () => {
    expect(() => divide(6, 0)).toThrow()
  })

  it('b が 0 のとき例外メッセージに "division by zero" を含む', () => {
    expect(() => divide(6, 0)).toThrow('division by zero')
  })
})
