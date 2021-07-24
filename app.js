require("dotenv").config();
// 預設引用模組
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 引用所需模組
const db = require(__dirname + "/modules/mysql2-connect");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const session = require("express-session");
const Mysqlstore = require("express-mysql-session")(session);
const sessionStore = new Mysqlstore({}, db);

// 建立web server物件
var app = express();

// 註冊樣板引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 預設middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 建立session設定
app.use(
    session({
        saveUninitialized: false, // 未使用session時，是否初始化物件(儲存session+發送cookie)
        resave: false, // 沒有變更內容，是否強制回存
        secret: "ejdafadslkfnhkldasjflkads", // 加密用字串，可隨意輸入
        store: sessionStore, // express-mysql-session
        cookie: {
            maxAge: 1200000,
        },
    })
);

// cors官方設定，簡單使用可略過
const corsOptions = {
    credentials: true,
    origin: function (origin, cb) {
        cb(null, true);
    },
};

// cors middleware
app.use(cors(corsOptions));

// 設定導覽首頁middleware，顯示server的靜態頁面，實做連接前端時不需要開啟
// const serveIndex = require("serve-index");
// app.use("/", serveIndex("public", { icons: true })); // 加入此行

// 路由開始
app.use("/coffeeIntroduce", require(__dirname + "/routes/coffeeIntroduce"));
app.use("/partners", require(__dirname + "/routes/partners"));
app.use("/shopMap", require(__dirname + "/routes/shopMap"));

// 捕捉404錯誤訊息並引導至error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
