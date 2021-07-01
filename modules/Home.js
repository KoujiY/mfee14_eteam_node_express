const db = require(__dirname+'/../modules/mysql2-connect');
//是一個模組把很多複雜的functio n 路由再取funstion的代號
// 用sql向dataBass取資料
// 他就像是一個function 之後會將資料傳給 routes的 home.js
// 類別一定要大寫，名子取甚麼都可以
class Home{
    constructor(
        oListId,ild,oQty,old
    )
    {
     this.oListId=oListId
     this.ild=ild
     this.oQty=oQty
     this.old=old
  
    }



















    static getUserByIdSQL(){
        let sql=
        "SELECT * FROM `orders_list`
         WHERE `oListId`=124"
        
        return sql

    }
}
  //  只有做宣告8~14
//    這裡才使用19~24
// order-list  ild 商品邊號 old定單編號 oQty商品數量