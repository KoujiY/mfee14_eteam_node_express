const express = require('express')

const router = express.Router()

const Users = require(__dirname+'/../modules/Users.js')

// mysql2 async-await用的
const db = require(__dirname + '/../modules/mysql2-connect.js')

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful-api的方法，預設為get
// multirow 是否為多資料回傳，預設為是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = 'get',
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await db.query(sql)

    switch (method) {
      case 'post': {
        // 仿照json-server的回傳
        const insertId = { uId: rows.insertId }
        // 合併id值
        const result = { ...instance, ...insertId }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'put': {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {}
        if (rows.affectedRows) result = { ...instance }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'delete': {
        // 仿照json-server的回傳
        res.status(200).json({})
        break
      }
      case 'get':
      default:
        {
          if (multirows) {
            // res.status(200).json({
            //   users: rows,
            // })
            res.status(200).json(rows)
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {}
            if (rows.length) result = rows[0]
            res.status(200).json(result)
          }
        }
        break
    }
  } catch (error) {
    // 錯誤處理
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}

// instance 物件實體，預設為空物件
async function userLogin(sql, req, res, instance) {
  try {
    const [rows, fields] = await db.query(sql)

    // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
    let result = {}
    if (rows.length) {
      result = rows[0]

      req.session.regenerate(function (err) {
        if (err) {
          res.status(200).json({ status: 2, message: '登入失敗' })
        }

        req.session.loginuId = result.uId
        req.session.loginuAcco = result.uAcco
        req.session.loginuPwd = result.uPwd
        req.session.loginuTWId = result.uTWId 
        req.session.loginCreated_at = result.created_at

        // 如果要用全訊息可以用以下的回傳
        // res.json({ status: 0, message: '登入成功' })
        res.status(200).json(result)
      })
    } else {
      res.status(200).json({ status: 1, message: '帳號或密碼錯誤' })

      //res.status(200).json(result)
    }
  } catch (error) {
    // 錯誤處理
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}

// 以下為路由

// 處理會員登入
// router.post('/login', function (req, res, next) {
//   let users = new Users(
//     req.body.name,
//     req.body.username,
//     req.body.password,
//     req.body.email
//   )

//   // 回應都寫在userLogin方法裡(async-await)
//   userLogin(users.getUserUserByUsernameAndPasswordSQL(), req, res, users)
// })

// // 處理會員登出
// router.get('/logout', function (req, res, next) {
//   req.session.destroy(function (err) {
//     if (err) {
//       res.status(200).json({ status: 1, message: '登出失敗' })
//       return
//     }

//     // 清除所有的session
//     req.session = null

//     res.clearCookie('skey')
//     res.status(200).json({ status: 0, message: '登出成功' })
//   })
// })

// // 檢查是否登入
// router.get('/checklogin', function (req, res, next) {
//   const sess = req.session

//   const id = sess.loginId
//   const username = sess.loginUsername
//   const name = sess.loginName
//   const email = sess.loginEmail
//   const createDate = sess.loginCreatedDate

//   const isLogined = !!name

//   if (isLogined) {
//     res.status(200).json({ id, name, username, email, createDate })
//   } else {
//     // 登出狀態時回傳`{id:0}`
//     res.status(200).json({ id: 0 })
//   }
// })

// get 處理獲取全部的資料列表
// AND查詢加入`?name=eddy&email=XXX&username=XXXX
router.get('/', (req, res, next) => {
  // res.json(req.query)
// Object.keys() 方法會回傳一個由指定物件所有可列舉之屬性組成的陣列，該陣列中的的排列順序與使用 for...in 進行迭代的順序相同（兩者的差異在於 for-in 迴圈還會迭代出物件自其原型鏈所繼承來的可列舉屬性）。
  if (!Object.keys(req.query).length) executeSQL(Users.getAllUserSQL(), res)
  else executeSQL(Users.getUserByQuerySQL(req.query), res)
})

// get 處理獲取單一筆的會員，使用id
router.get('/:userId', (req, res, next) => {
  executeSQL(Users.getUserByIdSQL(req.params.userId), res, 'get', false)
})
// localhost:6005/users/:userId

//
router.get('/add', (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)

  // 從request json 資料建立新的物件
  let users = new Users(
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
  )

  executeSQL(users.addUserSQL(), res, 'post', false, users)
})

//delete 刪除一筆資料
router.delete('/:userId', (req, res, next) => {
  executeSQL(Users.deleteUserByIdSQL(req.params.userId), res, 'delete', false)
})
// localhost:6005/users/17
// put 更新一筆資料
router.put('/:userId', (req, res) => {
  let users = new Users(
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.email
  )
  // localhost:6005/users/17
  // id值為數字
  user.id = +req.params.userId

  executeSQL(users.updateUserByIdSQL(req.params.userId), res, 'put', false, users)
})

//export default router
module.exports = router
