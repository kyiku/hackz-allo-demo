import { describe, expect, it } from 'vitest'
import { reverseString } from '../src/reverseString'

describe('reverseString', () => {
  it("reverseString('abc') は 'cba' を返す", () => {
    expect(reverseString('abc')).toBe('cba')
  })

  it("reverseString('') は '' を返す（空文字の境界ケース）", () => {
    expect(reverseString('')).toBe('')
  })
})
