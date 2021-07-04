class Users {
    constructor(uId,uAcco, uPwd, uMail, uPhone,uName,uTWId,uBirth,uCountry,uCity,uTownship,uStreet) {
      this.uId = 0
      this.uAcco = ""
      this.uPwd = ""
      this.uMail = ""
      this.uPhone = ""
      this.uName = ""
      this.uTWId = ""
      this.uBirth = ""
      this.uCountry = ""
      this.uCity = ""
      this.uTownship = ""
      this.uStreet = ""
    }
  
    addUserSQL() {
      let sql = `INSERT INTO users(uAcco, uPwd, uMail, uPhone,uName,uTWId,uBirth,uCountry,uCity,uTownship,uStreet) VALUES('${this.uAcco}', '${this.uPwd}', '${this.uMail}', '${this.uPhone}', '${this.uName}','${this.uTWId}','${this.uBirth}','${this.uCountry}','${this.uCity}','${this.uTownship}','${this.uStreet}')`
      return sql
    }
  
    updateUserByIdSQL(id) {
      let sql = `UPDATE USERS \
                 SET name = '${this.name}', username = '${this.username}', password = '${this.password}', email = '${this.email}', login = ${this.login} \
                 WHERE id =  ${id}`
      return sql
    }
  
    // static是與實例化無關
    static getUserByIdSQL(id) {
      let sql = `SELECT * FROM USERS WHERE id = ${id}`
      return sql
    }
  
    // login用
    getUserUserByUsernameAndPasswordSQL() {
      let sql = `SELECT * FROM USERS WHERE username = '${this.username}' AND password = '${this.password}' LIMIT 0,1`
      return sql
    }
  
    // static是與實例化無關
    // 假如 前端有給值  那就會push 進空陣列
    static getUserByQuerySQL(query) {
      const where = []
  
      if (query.uAcco) where.push(`uAcco = '${query.uAcco}'`)
      if (query.uPwd) where.push(`uPwd = '${query.uPwd}'`)
      if (query.uMail) where.push(`uMail = '${query.uMail}'`)
      if (query.uPhone) where.push(`uPhone = '${query.uPhone}'`)
      if (query.uName) where.push(`uName = '${query.uName}'`)
      if (query.uTWId) where.push(`uTWId = '${query.uTWId}'`)
      if (query.uBirth) where.push(`uBirth = '${query.uBirth}'`)
      if (query.uCountry) where.push(`uCountry = '${query.uCountry}'`)
      if (query.uCity) where.push(`uCity = '${query.uCity}'`)
      if (query.uTownship) where.push(`uTownship = '${query.uTownship}'`)
      if (query.uStreet) where.push(`uStreet = '${query.uStreet}'`)
  
      let sql = ''
  // 如果有值  就join(join() 方法會將陣列（或一個類陣列（array-like）物件）中所有的元素連接、合併成一個字串，並回傳此字串。) 進 database ，沒值就顯示全部
      if (where.length) sql = `SELECT * FROM USERS WHERE ` + where.join(' AND ')
      else sql = `SELECT * FROM USERS`
  
      return sql
    }
  
    static deleteUserByIdSQL(id) {
      let sql = `DELETE FROM USERS WHERE ID = ${id}`
      return sql
    }
  // 所有資料
    static getAllUserSQL() {
      let sql = `SELECT * FROM USERS`
      return sql
    }
  }
  
  //export default User
  module.exports = Users
  