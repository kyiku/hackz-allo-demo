/**
 * 与えられたテキストを大文字に変換し、末尾に感嘆符を付けて返す。
 *
 * @param text 変換対象の文字列（空文字も許容する）
 * @returns テキストを大文字化し `!` を付与した文字列
 *
 * @example
 * shout('hi') // => 'HI!'
 * shout('')   // => '!'
 */
export function shout(text: string): string {
  return `${text.toUpperCase()}!`
}
