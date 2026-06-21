# hackz-allo-demo

GitHub Issue RPG のデモ用ターゲットリポジトリ。

オープンな Issue が「敵」になり、ForgeAgent が TDD で実装して PR→マージすると撃破されます。

## デモの構成（超簡単）

- 未実装の関数: `src/greet.ts` の `greet(name)`（現在は空文字を返すスタブ）
- テスト: `test/greet.test.ts`（`greet('Claude') === 'Hello, Claude!'` を期待）
- 対応 Issue: 「`greet(name)` を実装する」

`greet` を `return \`Hello, ${name}!\`` のように実装すれば `npm test`（`vitest run`）が緑になり、PR がマージされて敵が撃破されます。

## コマンド

```bash
npm install
npm test
```
