# アプリケーションアーキテクチャ

## フォルダ構成

```bash
.
├── assets  # 画像やグローバルスタイル
├── components  # ページ本体以外のコンポーネント
├── dist    # yarn run buildで生成されるビルド成果物
├── docs    # ドキュメント, ロゴ原本など
├── layouts # 複数ページにわたって適用するレイアウト
├── lib     # Vueに依存しないJSロジック
├── models  # データモデル
├── pages   # ページコンポーネント
├── plugins # 認証情報取得などを行うプラグイン
├── static  # faviconやPWA対応アイコンなど
└── store   # Vuexストア
```

## ストア構成

```bash
store
├── -type.ts  # RootStateなどの型を定義するファイル
├── pages  # ページ固有のデータを取り扱うストア
│   └── sessions
│       ├── detail.ts
│       └── search.ts
├── snackbar.ts
└── user.ts  # 複数ページに跨るデータはドメインごとにstore直下に
```

### ストアの開発ポリシー

- `store/` 直下には、複数ページに跨る情報を扱うストアを定義します
  - ex) ユーザー情報など
- `store/pages/` 配下には、ある1ページでしか使用しない情報を扱うストアを定義します。
  - ファイル名の命名規則は `pages/` に近いものとなるようにします
  - ex) 現在見ているセッションの情報など

### コンポーネントのおけるVuexの利用ポリシー

- Container Component(CC)とPresentational Component(PC)に分ける考え方をベースとします
  - CC: `/pages` 配下にあるコンポーネント( `/components/organisms` も可)
  - PC: `/components` 配下にあるコンポーネント
- Presentational Componentは、原則Vuexにはアクセスせず、親からpropsで受け取ります
- Container Componentは、グローバルストア及びページ固有のストアにアクセスできます
  - PC及びCCを子要素にもち、PCに対してストアデータをpropsなどで渡します
  - APIアクセスや状態の保持は、必ずVuexストアで行います

#### 参考記事
- Presentational and Container Components - Dan Abramov - Medium
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0 
- Presentational ComponentとContainer Component / Yuuniworks Blog
https://www.yuuniworks.com/blog/2018-05-18-presentational-component%E3%81%A8container-component/
