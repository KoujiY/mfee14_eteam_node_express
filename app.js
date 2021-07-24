//創建node.js的環境的總路徑
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
// 跨來源資源共用

// 若有使用session 或 cookie時
const cors = require('cors');
app.use(cors());

var whitelist = ['http://localhost:8080', undefined,'http://localhost:3000'];
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        console.log('origin:'+origin);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  "cors": "^2.8.5",
//這要留嗎?
// const serveIndex = require("serve-index");
// app.use("/", serveIndex("public", { icons: true }));


app.use("/home",require(__dirname+"/routes/home"))
//所有檔案全部都會經過 中間軟體 /   路由":顯示在網站上 /  路徑: /home===/   


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
