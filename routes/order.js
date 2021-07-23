const express = require('express');
const db = require(__dirname + "/../modules/mysql2-connect");
const router = express.Router();
const upload = require(__dirname + "/../modules/upload-img");

router.post('/order', upload.none(),async(req, res, next) => {
    // 測試response，會自動解析為物件
    // console.log(typeof req.body)
    // console.log(req.body)
  
    //從request json 資料建立新的物件
    let output={
      sucess:false,error:'',insertId:0,
    }
    for(let item of req.body.orderList){
      const sql = "INSERT INTO `orders_list` SET? "
      const [result] = await db.query(sql, [item])
    
      const sql1 = "INSERT INTO `orders` SET?"
        const [results1] = await db.query(sql1,[
           { country:req.body.order.country,
            address:req.body.order.address,
            name:req.body.order.name,
            phone:req.body.order.phone,
            email:req.body.order.email,
            creditNum:req.body.order.step3.creditNum,
            totalPrice:req.body.order.subtotal
        }
        ])
        output = {...output, body:req.body.order}
        res.json(output)
    }})