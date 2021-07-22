require("dotenv").config();

const mysql = require("mysql2");

// 建立連線資訊
const pool = mysql.createPool({
  host: "localhost", //  //process.env.MY_HOST
  user: "root", // //process.env.MY_USER
  password: "root", //  //process.env.MY_PASS
  database: process.env.MY_DBNAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, // 最大連線數
  queueLimit: 0, // 排隊限制
});
// 上方waitForConnections、connectionLimit、queueLimit均為預設值

module.exports = pool.promise(); // 將pool以promoise形式匯出
