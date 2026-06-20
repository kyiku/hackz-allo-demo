import { describe, expect, it } from 'vitest'
import { shout } from '../src/shout'

describe('shout', () => {
  it("shout('hi') は 'HI!' を返す", () => {
    expect(shout('hi')).toBe('HI!')
  })

  it("shout('') は '!' を返す（空文字の境界ケース）", () => {
    expect(shout('')).toBe('!')
  })
})
