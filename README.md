# Relaym Client

RelaymのWebフロントエンドを管理するリポジトリです。

[![Netlify Status](https://api.netlify.com/api/v1/badges/48cac00b-bc6f-4706-ac06-20b5a6564a56/deploy-status)](https://app.netlify.com/sites/relaym/deploys)

## 開発にあたって

### サービス内容について知る

- [Relaym PRD (プロダクト要求仕様書)](https://github.com/camphor-/relaym-server/blob/master/docs/prd.md)
- [各種単語の定義](https://github.com/camphor-/relaym-server/blob/master/docs/definition.md)

### サーバーサイドが提供するAPI仕様について知る

- [API仕様書](https://github.com/camphor-/relaym-server/blob/master/docs/api.md)

### フロントエンドの開発ポリシーを知る

- [アプリケーションアーキテクチャ](docs/architecture.md)

## 開発

### 必要な環境

- [Node.js](https://nodejs.org/ja/)
  - 推奨バージョンが `.nvmrc` 及び `.node-version` に記載されています
  - [nvm](https://github.com/nvm-sh/nvm) や [nodenv](https://github.com/nodenv/nodenv) を使用すると、上記ファイルに基づいてバージョンが選択されるのでお勧めです
- [Yarn](https://classic.yarnpkg.com/ja/)

### ローカル開発環境のセットアップ

1. APIサーバーの立ち上げ

フロントエンドでの各種動作を確認するには、APIサーバーの起動が必要です。  
[APIサーバーのローカルでの環境構築手順](https://github.com/camphor-/relaym-server/blob/master/docs/development.md)をもとに、APIサーバーも起動しておきましょう。

2. 依存関係をインストールする

``` bash
$ yarn install
```

3. `/etc/hosts` ファイルを編集する

`localhost` ではクッキーを使えないので、別名を割り当てる必要があります。

 ```bash
$ sudo vim /etc/hosts
127.0.0.1 relaym.local # これを追加
::1 relaym.local # これを追加
 ```

4. 開発サーバーを立ち上げる

```
$ yarn run dev
```

http://relaym.local:3000/ でアクセスできることを確認しましょう。

### GitHubでの開発フロー

- `master` と `develop` ブランチは常にデプロイ可能であるものとします
  - 更新されると自動でNetlifyにデプロイが行われます
- 作業用ブランチは基本的に`develop`ブランチから作成し、PR作成時も`develop`ブランチをマージ先とします
- Pull Request, Issue, プログラム中のコメントは全て基本的に日本語とします
- コミットメッセージについては、日本語/英語どちらも可とします

### Pull Requestの作成にあたって

- Lintエラーがないことを確認しましょう
  - `yarn run lint`を実行すると確認できます
  - 自動で修正可能なものは、`yarn run lint --fix`で修正できます
- ビルドが行えることを確認しましょう
  - `yarn run build`を実行すると確認できます
- UI周りの変更は極力スクリーンショットを添付しましょう
