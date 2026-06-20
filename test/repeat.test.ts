import { describe, expect, it } from 'vitest'
import { repeat } from '../src/repeat'

describe('repeat', () => {
  it("repeat('ab', 3) は 'ababab' を返す", () => {
    expect(repeat('ab', 3)).toBe('ababab')
  })

  it("repeat('ab', 0) は '' を返す（境界ケース）", () => {
    expect(repeat('ab', 0)).toBe('')
  })

  it("空文字を繰り返しても '' を返す", () => {
    expect(repeat('', 5)).toBe('')
  })

  it('負の回数は RangeError を投げる（防壁）', () => {
    expect(() => repeat('ab', -1)).toThrow(RangeError)
  })

  it('整数でない回数は RangeError を投げる（防壁）', () => {
    expect(() => repeat('ab', 1.5)).toThrow(RangeError)
  })
})
