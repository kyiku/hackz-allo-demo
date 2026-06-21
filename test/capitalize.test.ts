import { describe, it, expect } from 'vitest'
import { capitalize } from '../src/capitalize'

describe('capitalize', () => {
  it('先頭1文字を大文字化する', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('空文字はそのまま返す', () => {
    expect(capitalize('')).toBe('')
  })
})
