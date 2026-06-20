# demo-repo（GitHub Issue RPG デモターゲット）

GitHub Issue RPG が攻略対象とするデモ用リポジトリの雛形。Vitest 基盤を備え、CIが緑になるベースライン（`calculator`）を含む。

## Usage（使い方）

このリポジトリは四則演算ライブラリと、安全な数式評価ユーティリティを提供します。
以下の例はコピー&ペーストでそのまま動作します。

### セットアップ

```bash
npm install      # 依存関係をインストール
npm test         # テストを実行（緑であることを確認）
```

### 例1: calculator で四則演算を行う

`src/calculator.ts` は `add` / `subtract` / `divide` と、汎用の `calculate` を提供します。

```ts
import { add, subtract, divide, calculate } from './src/calculator'

console.log(add(2, 3))        // => 5
console.log(subtract(5, 3))   // => 2
console.log(divide(6, 3))     // => 2

// calculate(op, a, b) でも同じことができる
console.log(calculate('add', 2, 3)) // => 5

// 0 で割ると例外になる
try {
  divide(1, 0)
} catch (err) {
  console.error((err as Error).message) // => "division by zero"
}
```

### 例2: 文字列の数式を安全に評価する

`src/expression.ts` の `evalExpression` は、`eval` を使わずに（インジェクション安全に）
四則演算と演算子の優先順位を尊重して数式を評価します。

```ts
import { evalExpression } from './src/expression'

console.log(evalExpression('1 + 2'))      // => 3
console.log(evalExpression('1 + 2 * 3'))  // => 7  （乗算が先に評価される）
console.log(evalExpression('1.5 + 2.5'))  // => 4

// 英字・括弧・セミコロンなどを含む式は拒否される（安全）
try {
  evalExpression('alert(1)')
} catch (err) {
  console.error((err as Error).message) // 不正な文字としてエラー
}
```

> 実行方法の例: `npx tsx example.ts`（`tsx` 等の TypeScript ランナーを利用）。
> 上記スニペットは `test/` のユニットテストでも同じ呼び出し・結果を検証しています。

## 使い方（standaloneリポジトリ化）

このディレクトリは monorepo のワークスペース外。実運用では単独の GitHub リポジトリとして push して使う:

```bash
cp -r examples/demo-repo /tmp/demo-repo && cd /tmp/demo-repo
git init && git add -A && git commit -m "init demo repo"
gh repo create <owner>/issue-rpg-demo --private --source=. --push
pnpm install && pnpm test   # 緑であることを確認
```

- CI / required checks / Allow auto-merge の設定: タスク2.2（`.github/workflows/ci.yml` と `scripts/setup-repo.sh`）
- デモ用 open issue の作成: タスク2.3（`scripts/seed-issues.sh`）

## 段階的にpassが見える構成

`src/calculator.ts` ＋ `test/calculator.test.ts` はベースライン（緑）。
デモIssueはここに無い新機能（例: 入力バリデーション）を要求し、AIエージェントが
TDDで実装してテストを段階的にpassさせる＝敵のHPが減る、という流れを再現する。
