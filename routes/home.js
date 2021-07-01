//路由設定 小寫
const express=require("express")
//node網站的框架  
const router= express.Router()//他是伊格function
//用express的框架裡的router，express裡面的路由工具  再給router
// 引入sql
const Home=require(__dirname+"/../modules/Home")
//dirname是本地端資料夾的位置 絕對路徑
//路由連  sql向dataBass取資料(他只是取資料) 有路由才有連線 /拿它去連modules




router.get( '/',async(req,res)=>{
    res.json([req.baseUrl,req.url]);
});
//後端通過路由來拿取前端的req資料，之後在res回去
//接收前端來的req然後在在responce回去

module.exports=router
//module 模組(home.js)
//等號右手邊只向左邊
//把又邊的東西丟給左邊
