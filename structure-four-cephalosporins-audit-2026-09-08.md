# 構造解析：セフェム4剤追加監査（2026-09-08）

## 追加薬

| key | 一般名 | 区分 | 構造典拠 |
|---|---|---|---|
| `cefroxadine` | セフロキサジン | 第1世代セフェム | PubChem CID 5284529 / ChEBI 31379 |
| `ceftizoxime` | セフチゾキシム | 第3世代セフェム | PubChem CID 6533629 / KEGG D00923 |
| `cefminox` | セフミノクス | セファマイシン | PubChem CID 71141 / ChEBI 135817 |
| `cefozopran` | セフォゾプラン | 第4世代セフェム | PubChem CID 9571080 |

## R1 / R3 の切り分け

| 一般名 | R1表示 | R3表示 |
|---|---|---|
| セフロキサジン | シクロヘキサジエニル-α-アミノアセチル型 | メトキシ型 |
| セフチゾキシム | アミノチアゾリル-メトキシイミノ型 | H（3位側鎖なし） |
| セフミノクス | アミノカルボキシエチルチオアセチル型 | N-メチルテトラゾールチオメチル型 |
| セフォゾプラン | アミノチアジアゾリル-メトキシイミノ型 | イミダゾピリダジニウムメチル型 |

## 検証結果

- 既存24剤の構造レコード、既存R1比較576通り、既存R3比較324通りは変更なし。
- 追加後は28剤、R1比較784通り（28×28）、R3比較484通り（R3保有22剤×22剤）。欠損なし。
- R1 Atom-Pair/Tanimoto は全組合せで対称。
- セフチゾキシム―セフォタキシムのR1は完全一致（1.0）。
- セフミノクス―セフメタゾールのR3は完全一致（1.0）。
- 全4剤で、全体構造・R1・R3 SMILESの解釈と、全体構造中のR1部分構造対応を確認。
- 全体構造図は既存表示規約に合わせ、βラクタム環Nを右下、R1を左上側に配置。
- セフミノクスは四員環を個別固定し、R1アミド結合炭素＝左上、カルボニル炭素＝左下、N＝右下、縮合環共有炭素＝右上とした。
- HTML内の全インラインJavaScriptの構文検査を通過。

## 典拠URL

- https://pubchem.ncbi.nlm.nih.gov/compound/Cefroxadine
- https://pubchem.ncbi.nlm.nih.gov/compound/Ceftizoxime
- https://www.genome.jp/dbget-bin/www_bget?D00923+D07658=
- https://pubchem.ncbi.nlm.nih.gov/compound/Cefminox
- https://pubchem.ncbi.nlm.nih.gov/compound/Cefozopran

## 生成条件

- RDKit 2026.03.6
- R1/R3類似度：Atom-Pair sparse-count fingerprint、chirality ON、Tanimoto
- 表示用補助値：Morgan fingerprint、radius 2、2048 bit、chirality ON
- 共通部分：MCS（元素一致、結合次数一致、環同士のみ、完全環のみ）
