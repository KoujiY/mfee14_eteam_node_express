var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require('express-session')
const Mysqlstore = require("express-mysql-session")(session);
const db = require(__dirname + '/modules/mysql2-connect');

const sessionStore = new Mysqlstore({}, db);


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
const cors = require('cors');
const corsOptions = {
  credentials: true,
  origin: function (origin, cb) {
      cb(null, true);
  },
};
var whitelist = ['http://localhost:7000', undefined, 'http://localhost:3000'];

// var corsOptions = {

// credentials: true,

// origin: function (origin, callback) {

// console.log('origin: '+origin);

// if (whitelist.indexOf(origin) !== -1) {

// callback(null, true)

// } else {

// callback(new Error('Not allowed by CORS'))

// }

// }

// };
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const serveIndex = require("serve-index");
// app.use("/", serveIndex("public", { icons: true })); // 加入此行
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
// app.use(
//     session({
//       cookieName: 'session',
//       secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
//       duration: 30 * 60 * 1000,
//       activeDuration: 5 * 60 * 1000,
//       httpOnly: true,
//       secure: true,
//       ephemeral: true,
//       resave: true,
//       saveUninitialized: true,
//     })
//   )
app.use('/cart', require(__dirname + '/routes/cart.js'));
app.use('/order', require(__dirname + '/routes/order.js'));

// catch 404 and forward to error handler
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
