const sql = require("mssql");
const bcrypt = require("bcrypt");

const tokenService = require('../service/tokenService');
const googleBucketService = require("../service/googleBucketService")
const UserDto = require('../dtos/userDto');
const ApiError = require("../exeptions/apiErrors");
const dbConfig = require("../dbConnection");


class UserService {
  async registration(name, lastname, age, experience, sport_type, country, city, mail, password, role, img, price) {
    const pool = await sql.connect(dbConfig);

    const hashPassword = await bcrypt.hash(password, 3);
    const candidate = await pool
      .request()
      .query(`SELECT * FROM [User] WHERE mail = '${mail}' AND password = '${password}'`);

    if (candidate.recordset.length > 0) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${mail} уже существует`);
    }

    // Check if price is a valid number
    const validPrice = !isNaN(price) ? price : 0; // You can set a default value or handle it based on your requirements

    await pool
      .request()
      .query(`INSERT INTO [User] (name, lastname, age, experience, sport_type, role, country, city, mail, password, photo, price)
      VALUES ('${name}','${lastname}', ${age}, ${experience}, '${sport_type}', '${role}', '${country}', '${city}', '${mail}', '${hashPassword}', '${img}', ${validPrice})`);
  }


  async login(mail, password) {
    const pool = await sql.connect(dbConfig);

    const user = await pool.request().query(`SELECT * FROM [User] WHERE mail = '${mail}'`);
    if (user.recordset.length === 0) {
      throw ApiError.BadRequest(`Пользователь с ${mail} не найден`);
    }

    const isPassEquals = await bcrypt.compare(password, user.recordset[0].password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user.recordset[0])
    const token = tokenService.generateToken({ ...userDto });
    const userRole =  await pool.request().query(`SELECT role FROM [User] WHERE mail = '${mail}'`);

    return { token, role: userRole.recordset[0].role }
  }

  async changeUserInfo(name, lastname, experience, sport_type, country, city, email, userId) {
    try {
      await pool.request().query(`UPDATE Users SET name = '${name}'
      , lastname = '${lastname}', experience = '${experience}', sport_type = '${sport_type}', 
      country = '${country}', city = '${city}', email = '${email}' WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUser(token){
    try {
      const userId = tokenService.getUserIdFromToken(token);
      const pool = await sql.connect(dbConfig);
      const user = await pool.request().query(`SELECT * FROM [User] WHERE id = ${userId}`);
      if (user.recordset.length > 0) {
        const userData = user.recordset[0];

        if (userData.photo) {
          userData.photo = await googleBucketService.getImage(userData.photo);
        }

        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllUsers(){
    try {
      const pool = await sql.connect(dbConfig);
      const allUsers = await pool.request().query(`SELECT * FROM [User]`);

      return allUsers.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(userId){
    try {
      await pool.request().query(`DELETE FROM User WHERE id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserHistory(userId){
    try {
      // todo order by
      await pool.request().query(`SELECT * FROM User_History WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getBannedUser(){
    try {
      await pool.request().query(`SELECT * FROM User WHERE is_banned = 1`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addBannedUser(userId){
    try {
      await pool.request().query(`UPDATE User SET is_banned = 0 WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeBannedUser(userId){
    try {
      await pool.request().query(`UPDATE User SET is_banned = 1 WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addReport(firstUserId, secondUserId, reason){
    try {
      await pool.request().query(`INSERT INTO User_report (firstUserId, secondUserId, reason) 
      VALUES ('${firstUserId}','${secondUserId}', '${reason}') `);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addCommentToService(token, text){
    try {
      const userId = tokenService.getUserIdFromToken(token);
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`INSERT INTO [Service_comments] (user_id, description) 
      VALUES (${userId},'${text}')`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLastServiceComments(){
    try {
      const pool = await sql.connect(dbConfig);
      const comments = await pool.request().query(`SELECT TOP 8 * FROM [Service_comments] ORDER BY date DESC;`);
      return comments.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addCommentToCoach(userId, trainerId, text){
    try {
      await pool.request().query(`INSERT INTO User_report (user_id, trainer_id, text) 
      VALUES ('${userId}','${trainerId}', '${text}') `);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}


module.exports = new UserService();