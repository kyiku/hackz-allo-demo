import { describe, it, expect } from 'vitest'
import { add } from '../src/add'

describe('add', () => {
  it('正の数同士の和を返す', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('負の数を含む和を返す', () => {
    expect(add(-4, 1)).toBe(-3)
  })

  it('0同士の和を返す', () => {
    expect(add(0, 0)).toBe(0)
  })
})
