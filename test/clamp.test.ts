import { describe, it, expect } from 'vitest'
import { clamp } from '../src/clamp'

describe('clamp', () => {
  it('範囲内の値はそのまま返す', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('min より小さい値は min を返す', () => {
    expect(clamp(-3, 0, 10)).toBe(0)
  })

  it('max より大きい値は max を返す', () => {
    expect(clamp(99, 0, 10)).toBe(10)
  })
})
