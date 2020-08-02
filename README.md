# Relaym Client

RelaymのWebフロントエンドを管理するリポジトリです。

[![Netlify Status](https://api.netlify.com/api/v1/badges/48cac00b-bc6f-4706-ac06-20b5a6564a56/deploy-status)](https://app.netlify.com/sites/relaym/deploys)

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
