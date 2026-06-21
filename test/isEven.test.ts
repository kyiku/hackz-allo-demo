import { describe, it, expect } from 'vitest'
import { isEven } from '../src/isEven'

describe('isEven', () => {
  it('偶数のとき true を返す', () => {
    expect(isEven(4)).toBe(true)
    expect(isEven(0)).toBe(true)
  })

  it('奇数のとき false を返す', () => {
    expect(isEven(7)).toBe(false)
  })
})
