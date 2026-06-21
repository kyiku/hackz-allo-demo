import { describe, it, expect } from 'vitest'
import { max } from '../src/max'

describe('max', () => {
  it('第2引数が大きい場合に大きい方の値を返す', () => {
    expect(max(3, 9)).toBe(9)
  })

  it('両者が等しい場合にその値を返す', () => {
    expect(max(2, 2)).toBe(2)
  })

  it('第1引数が大きい場合に大きい方の値を返す', () => {
    expect(max(-1, -5)).toBe(-1)
  })
})
