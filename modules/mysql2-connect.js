require("dotenv").config();

const mysql = require("mysql2");

// 建立連線資訊
const pool = mysql.createPool({
<<<<<<< HEAD
  // 庭瑋database
  host: process.env.MY_HOST, 
  user:process.env.MY_USER , 
  password: process.env.MY_PASS, 
  database: process.env.MY_DBNAME, 
  // 我自己的database
  // host: "localhost", 
  // user:"root" , 
  // password: "root", 
  // database: "mfee14_eteam_testserver", 
=======
  host: process.env.MY_HOST,
  user: process.env.MY_USER,
  password: process.env.MY_PASS,
  database: process.env.MY_DBNAME,
>>>>>>> 3d60a4a21bf5973f9cb2452ff34e4bc6437d5922
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, // 最大連線數
  queueLimit: 0, // 排隊限制
});
// 上方waitForConnections、connectionLimit、queueLimit均為預設值

module.exports = pool.promise(); // 將pool以promoise形式匯出
