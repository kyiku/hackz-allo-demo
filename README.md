# hackz-allo-demo

GitHub Issue RPG のデモ用ターゲットリポジトリ。

オープンな Issue が「敵」になり、ForgeAgent が **TDD**（先にテストを書いて RED → 最小実装で GREEN）で
実装し、`npm test`（`vitest run`）が緑になると PR→マージで撃破されます。

## ルール（重要）

- **各 Issue ＝ これから実装する1つの関数**。リポジトリには未実装機能の失敗テストは置きません
  （`npm test` を共有するため、複数の失敗テストがあると相互ブロックするため）。
- 実装は `src/<name>.ts`、テストは `test/<name>.test.ts`（vitest）に置きます。
- お手本：`src/greet.ts` ＋ `test/greet.test.ts`（実装済み・緑）。同じスタイルで各機能を実装します。

## コマンド

```bash
npm install
npm test   # vitest run
```
