const express = require('express')

const router = express.Router()

const Users = require(__dirname+'/../modules/Users.js')

// mysql2 async-await用的
const db = require(__dirname + '/../modules/mysql2-connect.js')

// 連線測試(databse 與 nodejs)
router.get("/",async(req,res)=>{
  // res.send("123");
  // res.json(["123"]);
  let sql ="SELECT * FROM `users`";
  const [result] = await db.query(sql);
  res.json(result); 
})

// 新增測試
router.get("/add1",async(req,res)=>{


  let sql ="INSERT INTO users(`uAcco`, `uPwd`, `uMail`, `uPhone`,`uName`,`uTWId`,`uBirth`,`uCountry`,`uCity`,`uTownship`,`uStreet`) VALUES(1,1,1,1,1,1,1,1,1,1,1)";

  const [result] = await db.query(sql);
  res.json({
    result,
    body:req.body,
   });  

})
// 修改測試
router.get("/edit1",async(req,res)=>{
  
  let sql = "UPDATE users SET `uAcco` = '白222' WHERE `uId` = '634'";

  const [result] = await db.query(sql);
  res.json({
    result,
    body:req.body,
   });  
})

// 刪除測試

router.get("/delete",async(req,res)=>{
  let sql="DELETE FROM `users` WHERE `uId`='633'";
  let [result]= await db.query(sql);
  res.json({
    result,
    body:req.body,
  })
})


// 新增功能(變數)
router.post("/add",async(req,res)=>{


   let sql ="INSERT INTO users(`uAcco`, `uPwd`, `uMail`, `uPhone`,`uName`,`uTWId`,`uBirth`,`uCountry`,`uCity`,`uTownship`,`uStreet`) VALUES(?,?,?,?,?,?,?,?,?,?,?)";

   const [result] = await db.query(sql,[
     req.body.uAcco,
     req.body.uPwd,
     req.body.uMail,
     req.body.uPhone,
     req.body.uName,
     req.body.uTWId,
     req.body.uBirth,
     req.body.uCountry,
     req.body.uCity,
     req.body.uTownship,
     req.body.uStreet,
    ]);
   res.json({
     result,
     body:req.body,
    });  

})

router.post("/edit",async(req,res)=>{

})

//export default router
module.exports = router
