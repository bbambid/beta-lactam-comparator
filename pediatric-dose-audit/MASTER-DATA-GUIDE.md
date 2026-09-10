# 小児処方監査ツール：正式マスター運用

## 正式な編集先

本番の拡張 JavaScript は `pediatric-master-2026-09.js` の1本だけです。`index.html` 内の `DB` は初期起動用の基礎データで、正式マスターが剤形統合、添付文書表示、検索、判定補正、監査表示を最終確定します。

今後の薬剤・製剤・検索・判定・表示の修正は、原則として正式マスターだけを編集します。`image-*`、`nkdesk-*`、`coverage-*`、`oral-batch-*`、`pmda-final-batch-*` などの旧 JavaScript は移行前へ戻すための参照用です。本番からは読み込まず、新しい修正を追加しません。

## 変更手順

1. `pediatric-master-2026-09.js` を編集する。
2. PMDA由来の用量を変える場合は `PMDA-AUDIT-PROTOCOL.md` に従い、URL、確認日、監査メモ、境界テストを更新する。
3. `node tools/release-pediatric.mjs` を実行する。
4. 生成された単体版 `handoff/pediatric-dose-audit/index.html` を確認する。
5. 本番更新前に GitHub の現行 `main` をバックアップブランチへ保存する。
6. 本番反映後、公開URLで版表示と代表操作を確認する。

## ファイルの役割

- `index.html`：画面、初期起動用データ、判定の中核
- `pediatric-master-2026-09.js`：本番で唯一読み込む正式な拡張マスター
- `category-layout-fixes-2026-09.css`：検索・一覧画面のレイアウト
- `tests/clinical-scenarios.mjs`：代表的な処方例の回帰テスト
- `tests/source-integrity.mjs`：本番が正式マスター1本だけを読むことの検査
- `CHANGELOG.md`：利用者向け変更履歴

## 単体版と分割版

分割版は GitHub Pages と会社サイトでの通常公開向けです。ブラウザが HTML、正式マスター、CSS を別々に取得するため、修正箇所とキャッシュを管理しやすくなります。

単体版は受け渡し・保管・別チャットでの修正向けです。JavaScript と CSS を `index.html` に埋め込むため、その1ファイルだけで開けます。単体版を直した場合も、正式マスターへ差分を戻してから公開版を再生成します。
