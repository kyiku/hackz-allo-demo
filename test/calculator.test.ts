import { describe, expect, it } from 'vitest'
import { calculate } from '../src/calculator'

describe('calculate', () => {
  it("calculate('add', 2, 3) が 5 を返すこと", () => {
    expect(calculate('add', 2, 3)).toBe(5)
  })

  it("calculate('sub', 5, 3) が 2 を返すこと", () => {
    expect(calculate('sub', 5, 3)).toBe(2)
  })

  it('未知の op を渡した場合に例外をスローすること', () => {
    // @ts-expect-error 未知の op を意図的に渡す
    expect(() => calculate('mul', 2, 3)).toThrow()
  })

  it('負の数の加算が正しく計算されること', () => {
    expect(calculate('add', -2, -3)).toBe(-5)
  })

  it('減算で結果が負になる場合も正しく計算されること', () => {
    expect(calculate('sub', 3, 5)).toBe(-2)
  })
})
