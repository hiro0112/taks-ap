# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業するときのガイドです。

## プロジェクト概要

- **名称**: task-ap（タスクボードアプリ）
- **スタック**: React 18 + TypeScript + Vite 5
- **機能**: テキスト入力でタスク追加 / チェックボックスで完了・未完了切り替え / タスク削除 / 完了済みはグレー表示。タスクは `localStorage`（キー `task-ap.tasks`）に永続化。
- 状態管理は `App.tsx` の `useState` のみ。ライブラリは増やさず、小さく保つ。

## ディレクトリ構成

```
task-ap/
├── CLAUDE.md
├── index.html          … エントリ HTML
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.node.json
└── src/
    ├── main.tsx        … React ルートのマウント
    ├── App.tsx         … タスクボード本体（状態・ロジック）
    ├── App.css         … App のスタイル
    ├── index.css       … グローバルスタイル
    └── vite-env.d.ts
```

## 開発コマンド

| 目的 | コマンド |
| --- | --- |
| 依存インストール | `npm install` |
| 開発サーバー起動 | `npm run dev`（http://localhost:5173） |
| ビルド | `npm run build`（`tsc -b` で型チェック後に `vite build`） |
| ビルド結果のプレビュー | `npm run preview` |

- Lint / テストは未導入。追加したらこの表と下記「Claude Code への指示」を更新する。
- コード変更後は最低限 `npm run build` が通ることを確認してからコミットする。

## コーディング規約

- 既存コードのスタイル（命名・コメント量・イディオム）に合わせる。
- 1コミット1目的。無関係な変更を混ぜない。
- 秘密情報（APIキー・トークン等）はコミットしない。`.env` は `.gitignore` に入れ、`.env.example` を用意する。
- 変更したら、対応するテスト・ドキュメントも同じコミットで更新する。

## Git 運用ルール

> **原則: コードを変更するたびに GitHub へプッシュする。**
> ローカルにコミットを溜めない。1つの意味のある変更 = 1コミット = 即プッシュ。

### 手順（コード変更のたびに毎回）

1. 変更内容を確認する: `git status` / `git diff`
2. ステージする: `git add <変更したファイル>`（`git add -A` は意図しないファイルに注意）
3. コミットする（メッセージ規約は下記）
4. **すぐにプッシュする**: `git push`
5. リモート未設定・未初期化なら「初回セットアップ」を先に行う

作業を中断するときも、ビルドが通る状態でコミットしてプッシュしておく。

### コミットメッセージ規約

Conventional Commits に従う:

```
<type>: <変更内容の要約（現在形・簡潔に）>

（必要なら本文で理由や背景を説明）

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

- **type**: `feat` / `fix` / `docs` / `refactor` / `test` / `chore` / `style` / `perf`
- 例: `feat: タスクの追加・削除機能を実装`

### ブランチ運用

- `main` は常にビルドが通る状態を保つ。
- 小さな変更は `main` に直接コミット＆プッシュして良い。
- まとまった機能は `feat/<内容>`、修正は `fix/<内容>` ブランチを切り、完了後に `main` へマージしてプッシュ。

### 初回セットアップ（まだ Git リポジトリではない）

```bash
git init
git branch -M main
git add -A
git commit -m "chore: プロジェクト初期化"
# GitHub にリポジトリを作成してから：
git remote add origin <リポジトリURL>
git push -u origin main
```

`gh` CLI があれば: `gh repo create task-ap --private --source . --remote origin --push`

### 禁止事項

- `git push --force`（`--force-with-lease` を検討し、それでも慎重に）
- フック無効化（`--no-verify`）はユーザーの明示的な指示がある場合のみ
- 秘密情報や大容量バイナリのコミット

## Claude Code への指示

- コード変更を伴うタスクが完了したら、上記「Git 運用ルール」に従ってコミットし、`git push` まで実行する。
- プッシュが失敗したら（コンフリクト等）、内容を報告して指示を仰ぐ。
- スタックや構成が固まったら、このファイルの該当セクションを更新する。
