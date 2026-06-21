import { describe, it, expect } from 'vitest'
import { multiply } from '../src/multiply'

describe('multiply', () => {
  it('正の数同士の積を返す', () => {
    expect(multiply(3, 4)).toBe(12)
  })

  it('負の数を含む積を返す', () => {
    expect(multiply(-2, 5)).toBe(-10)
  })

  it('0を掛けると0を返す', () => {
    expect(multiply(7, 0)).toBe(0)
  })
})
