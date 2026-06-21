import { describe, it, expect } from 'vitest'
import { greet } from '../src/greet'

describe('greet', () => {
  it('名前を埋め込んだあいさつを返す', () => {
    expect(greet('Claude')).toBe('Hello, Claude!')
  })

  it('日本語の名前も扱える', () => {
    expect(greet('世界')).toBe('Hello, 世界!')
  })
})
