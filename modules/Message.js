const db = require("./mysql2-connect");

const moment = require("moment-timezone");

class Message {
  constructor(data) {
    // 僅初始化要新增/修改用的欄位
    let defaultData = {
      mId: null,
      iId: 0,
      uId: 0,
      message: "",
      mStar: 0,
      mLike: 0,
      created_at: "",
    };
    this.data = { ...defaultData, ...data };
  }

  async readMessageText(iId) {
    if (iId) {
      const sql =
        "SELECT `mId`,`uImg`,`uName`,`message`,`mStar`,`mLike`,`msgboard`.`created_at`FROM `msgboard`JOIN `users`ON `msgboard`.`uId` = `users`.`uId`WHERE `msgboard`.`iId` = ?";
      const [result] = await db.query(sql, [iId]);
      //  時間顯示 = moment(設定時間).format(時間格式)
      // return result[1].oDate = moment(result[1].oDate).format(
      //   "YYYY-MM-DD"
      // )
      for (let i = 0; i < result.length; i++) {
        result[i].created_at = moment(result[i].created_at).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return result;
    } else {
      return false;
    }
  }

  async addMessageText() {
    if (!this.data.mId) {
      if (this.data.created_at === "") delete this.data.created_at;
      const sql = "INSERT INTO `msgboard` SET ?";
      const [result] = await db.query(sql, [this.data]);
      if (result.insertId) {
        this.data.mId = result.insertId;
        return this.data;
      } else {
        return false;
      }
    }
  }

  async usersImgMessage(uId) {
    if (uId) {
      const sql = "SELECT `uImg`,`uName` FROM `users` WHERE `uId`=?";
      const [result] = await db.query(sql, [uId]);
      return result;
    } else {
      return false;
    }
  }
}

module.exports = Message;
