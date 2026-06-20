/**
 * デモ用の最小ロジック。CIが緑になるベースライン。
 * 新機能（バリデーション等）はデモIssue（タスク2.3）でAIが実装する対象となる。
 */
export function add(a: number, b: number): number {
  return a + b
}

export function subtract(a: number, b: number): number {
  return a - b
}

/**
 * a を b で割る。b が 0 の場合は 'division by zero' を含むエラーを投げる。
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('division by zero')
  }
  return a / b
}
