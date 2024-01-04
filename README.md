# 概要

Express × SQLite3で作成したお問合せフォームのサンプル

# 実行方法

始めに実行

```sh
npm i # node_modulesインストール
sqlite3 contact_form.sqlite3 # データベースを作成&ログイン
```

sqlite内で実行

```sql
-- テーブルを作成
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT,
    user_email TEXT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);
.exit -- 終了 
```

起動

```sh
npm run dev # 起動
```