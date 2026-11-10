# コマ16 CI演習の確認結果

2026年11月10日に演習1〜4を実施しました。

## 演習1 警告も失敗にする

`app/about/page.js` に `<img src="/next.svg" alt="logo" />` を一時追加しました。

- `eslint` は警告1件でも終了コード0でした。
- `eslint --max-warnings=0` は同じ警告で終了コード1でした。
- 追加したimgを削除すると終了コード0に戻りました。
- package.jsonのlintを `eslint --max-warnings=0` に変更しました。

## 演習2 ビルドのエラーをログから読む

import先を `@/components/TodoAppClinet` に変更してPRにコミットしました。
[CI #23](https://github.com/gotakuho/todo-app1110/actions/runs/42752150069) のBuildで次のエラーを確認しました。

```text
./app/page.js:1:1
Error: Module not found: Can't resolve '@/components/TodoAppClinet'
```

app/page.jsの1行目のファイル名の打ち間違いが原因です。正しい `TodoAppClient` に修正しました。

## 演習3 Prettier

Prettierを開発用依存に追加し、.prettierrcと.prettierignoreを作成しました。
`npm run format` で整形し、CIのLintとBuildの間に `npm run format:check` を追加しました。

[CI #22](https://github.com/gotakuho/todo-app1110/actions/runs/42751914149) でLint・Format check・Buildが成功しました。
その後app/page.jsに分号を一時追加し、[CI #24](https://github.com/gotakuho/todo-app1110/actions/runs/42752349369) でLint成功、Format check失敗、Buildスキップを確認しました。
分号は削除済みです。

## 演習4 古い実行の自動キャンセル

ci.ymlに次の設定を追加しました。

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

1分以内に連続コミットし、[CI #21](https://github.com/gotakuho/todo-app1110/actions/runs/42751875346) などの古い実行がCancelledになることを確認しました。

## 最終設定

- mainへのPRとpushで `npm ci → npm run lint → npm run format:check → npm run build` を実行します。
- Node.jsのバージョンは.nvmrcの24で管理します。
- `cache: npm` はパッケージのダウンロードキャッシュを再利用します。node_modulesそのものの保存ではなく、依存のインストールには毎回npm ciを実行します。
- npm ciはlockファイルを変更せず、package.jsonと不整合なら失敗します。npm installは開発時の依存追加・更新に使います。
- READMEにチェック内容とCIバッジを追加しました。
- ローカルのLint・Format check・Buildと、既存の61テストが成功しました。
- 最終CIとマージ結果は[PR #3](https://github.com/gotakuho/todo-app1110/pull/3)で確認できます。
