var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Contact Form" });
});

//データベースオブジェクトの取得
const db = new sqlite3.Database("contact_form.sqlite3");

router.get("/list", function (req, res, next) {
  db.serialize(() => {
    //SQL文, memosテーブルから全てのレコードを取得する（* は全て）
    db.all("select * from users", (err, rows) => {
      if (!err) {
        const data = {
          title: "Users list",
          content: rows, //DataBaseから返された全レコードがrowsに配列で入ります
        };
        //viewファイルのmemo/indexにdataオブジェクトが渡されます
        //res.render(テンプレートファイル名, { 渡す値をオブジェクトで }) → テンプレートファイルを描画する

        res.render('list', data);
        // res.send(data);
      }
    });
  });
});

router.post("/send", function (req, res, next) {
  const { username, useremail, usercontent } = req.body;

  //SQL文, DataBaseのレコード作成
  db.run(
    "insert into users (user_name, user_email, content) values (?, ? , ?)",
    username,
    useremail,
    usercontent
  );
  //res.redirect() 引数に指定したアドレスにリダイレクト
  res.render("result", { result: "Seccess!!" });
});

router.post("/delete", function (req, res, next) {
  const { id } = req.body;

  //SQL文, DataBaseのレコード作成
  db.run(
    "delete from users where user_id = ?",
    id
  );
  //res.redirect() 引数に指定したアドレスにリダイレクト
  res.render("result", { result: "Seccess!!" });
});

module.exports = router;
