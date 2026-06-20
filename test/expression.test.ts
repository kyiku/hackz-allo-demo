import { describe, expect, it } from 'vitest'
import { evalExpression } from '../src/expression'

describe('evalExpression', () => {
  it("1. evalExpression('1 + 2') が 3 を返す", () => {
    expect(evalExpression('1 + 2')).toBe(3)
  })

  it('2. 加算・減算・乗算・除算が正しく計算される', () => {
    expect(evalExpression('2 + 3')).toBe(5)
    expect(evalExpression('10 - 4')).toBe(6)
    expect(evalExpression('6 * 7')).toBe(42)
    expect(evalExpression('20 / 5')).toBe(4)
  })

  it('3. 空白を含む式が正しく評価される', () => {
    expect(evalExpression('  1   +   2  ')).toBe(3)
    expect(evalExpression('2*3 + 4')).toBe(10)
  })

  it('4. 小数を含む式が正しく評価される', () => {
    expect(evalExpression('1.5 + 2.5')).toBe(4)
    expect(evalExpression('0.1 + 0.2')).toBeCloseTo(0.3)
    expect(evalExpression('3.5 * 2')).toBe(7)
  })

  it('5. 英字を含む式で例外が投げられる', () => {
    expect(() => evalExpression('1 + a')).toThrow()
    expect(() => evalExpression('alert(1)')).toThrow()
  })

  it('6. 括弧を含む式で例外が投げられる', () => {
    expect(() => evalExpression('(1 + 2)')).toThrow()
    expect(() => evalExpression('2 * (3 + 4)')).toThrow()
  })

  it('7. セミコロンを含む式で例外が投げられる', () => {
    expect(() => evalExpression('1 + 2;')).toThrow()
    expect(() => evalExpression('1; 2')).toThrow()
  })

  it('8. 空文字や空白のみの式で例外が投げられる', () => {
    expect(() => evalExpression('')).toThrow()
    expect(() => evalExpression('   ')).toThrow()
  })

  it('9. ゼロ除算が適切に処理される', () => {
    expect(() => evalExpression('1 / 0')).toThrow()
  })

  it('10. 演算子の優先順位（乗除が加減より先）が守られる', () => {
    expect(evalExpression('2 + 3 * 4')).toBe(14)
    expect(evalExpression('10 - 6 / 2')).toBe(7)
    expect(evalExpression('2 * 3 + 4 * 5')).toBe(26)
  })

  it('不正な構文（複数小数点・連続/末尾演算子）で例外が投げられる', () => {
    expect(() => evalExpression('1.2.3')).toThrow()
    expect(() => evalExpression('1 + + 2')).toThrow()
    expect(() => evalExpression('1 +')).toThrow()
  })

  it('単一の数値も評価できる', () => {
    expect(evalExpression('42')).toBe(42)
  })
})
