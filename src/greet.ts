/**
 * 与えられた名前に対する挨拶文を返す。
 *
 * @param name 挨拶の対象となる名前（空文字も許容する）
 * @returns `Hello, {name}!` 形式の挨拶文
 *
 * @example
 * greet('Sora') // => 'Hello, Sora!'
 * greet('')     // => 'Hello, !'
 */
export function greet(name: string): string {
  return `Hello, ${name}!`
}
