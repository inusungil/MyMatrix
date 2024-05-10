const mysql = require("mysql2/promise");

exports.pool = mysql.createPool({
  host: "www.inusik.shop",
  user: "inusik",
  port: "3306",
  password: "111111",
  database: "MyTodoDB",
});
