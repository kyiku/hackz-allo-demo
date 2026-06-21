/**
 * 名前を受け取り、あいさつ文字列を返す（実装サンプル）。
 *
 * 各 Issue（敵）は、この greet と同じスタイルで
 * `src/<name>.ts` に実装し、`test/<name>.test.ts` に vitest のテストを書きます。
 */
export function greet(name: string): string {
  return `Hello, ${name}!`
}
