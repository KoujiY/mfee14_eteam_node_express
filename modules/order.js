class Order {
  constructor(uAcco, subtotal, address, name,phone,email,iId,) {
    this.uAcco = ''
    step2.subtotal =subtotal
    step2.address = city+township+street
    step2.name = name
    step2.phone = phone
    step2.email = email
    step3.creditNum=creditNum
    
    // step1.iId = iId
    // step1.name = name
    // step1.category = category
    // step1.iPrice = iPrice
    // step1.iCount=iCount

    // this.login = 0
  }

  //尚未取得會員id
  addOrderSQL() {
    let sql = `INSERT INTO orders( uAcco, oPrice, cNum, oAddress,  oName, oPhone, oMail, oDate) \
                   VALUES('${this.uAcco}', '${step2.subtotal}',${step3.creditNum}', '${step2.address}','${step2.name}','${step2.phone}','${step2.email}',  NOW())`
                   
    let sql2 = `INSERT INTO orders_list(oListId, oId, oListName, oListPrice, oQty)\
                   VALUES('${this.iId}', '${this.name}', '${this.category}','${this.iPrice}','${this.iCount}', NOW())`
    
                   return (sql,sql2)
  }

  
}

//export default Order
module.exports = Order
