# ベースイメージとして公式のNode.jsイメージを使用
FROM node:16

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 環境変数を設定
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# アプリケーションを起動
CMD ["npm", "start"]

# コンテナがリッスンするポートを指定
EXPOSE 3000
