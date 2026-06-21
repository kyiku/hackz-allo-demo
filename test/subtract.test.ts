import { describe, it, expect } from 'vitest'
import { subtract } from '../src/subtract'

describe('subtract', () => {
  it('正の数同士の減算: subtract(10, 4) が 6 を返すこと', () => {
    expect(subtract(10, 4)).toBe(6)
  })

  it('結果が負になる減算: subtract(0, 5) が -5 を返すこと', () => {
    expect(subtract(0, 5)).toBe(-5)
  })

  it('負の数同士の減算: subtract(-2, -2) が 0 を返すこと', () => {
    expect(subtract(-2, -2)).toBe(0)
  })
})
