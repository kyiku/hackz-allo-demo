import { describe, it, expect } from 'vitest'
import { sum } from '../src/sum'

describe('sum', () => {
  it('複数要素の合計を返す', () => {
    expect(sum([1, 2, 3])).toBe(6)
  })

  it('空配列は 0 を返す', () => {
    expect(sum([])).toBe(0)
  })

  it('正負混在でも正しく合計する', () => {
    expect(sum([-1, 1, -1, 1])).toBe(0)
  })
})
