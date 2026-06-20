import { describe, expect, it } from 'vitest'
import { greet } from '../src/greet'

describe('greet', () => {
  it("greet('Sora') は 'Hello, Sora!' を返す", () => {
    expect(greet('Sora')).toBe('Hello, Sora!')
  })

  it("greet('') は 'Hello, !' を返す（空文字の境界ケース）", () => {
    expect(greet('')).toBe('Hello, !')
  })
})
