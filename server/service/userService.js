const sql = require("mssql");
const bcrypt = require("bcrypt");

const tokenService = require('../service/tokenService');
const googleBucketService = require("../service/googleBucketService");
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

  //todo
  async changeUserInfo(name, lastname, mail, role, price, country, city, age, experience, sport_type, reg_date, photo, token) {
    try {
      const pool = await sql.connect(dbConfig);
      const userId = await tokenService.getUserIdFromToken(token);
      let query = `UPDATE [User] SET name = '${name}'
      , lastname = '${lastname}', age = ${age}, experience = ${experience}, sport_type = '${sport_type}', role='${role}', 
      country = '${country}', city = '${city}', mail = '${mail}', photo = '${photo}'`;

      if(price !== undefined) {
        query += `, price =${price} WHERE id = ${userId}`;
      }
      else{
        query += ` WHERE id = ${userId}`;
      }

      await pool.request().query(query);

      const updatedDate = await pool.request().query(`SELECT * FROM [User] WHERE id = ${userId}`);
      const forSend = new UserDto(updatedDate.recordset[0]);

      if (forSend.photo) {
        forSend.photoUrl = await googleBucketService.getImage(forSend.photo);
      }

      return {
        updated: forSend,
        message: "Data updated",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUser(id) {
    try {
      const pool = await sql.connect(dbConfig);

      // Select user with their rating (if available) from Coach_ratings
      const user = await pool.request().query(`
      SELECT u.*
      FROM [User] u
      LEFT JOIN [Coach_ratings] cr ON u.id = cr.id
      WHERE u.id = ${id}
    `);

      let userRating = 0
      const userRatingArr = await pool.request().query(`SELECT ratingValue FROM [Coach_ratings] WHERE coachId = ${id}`)
      if (userRatingArr.recordset.length > 0) {
        userRating =
          userRatingArr.recordset.reduce((acc, currentValue) => acc + currentValue.ratingValue, 0) /
          userRatingArr.recordset.length;
      }

      if (user.recordset.length > 0) {
        const userData = user.recordset[0];

        if (userData.photo) {
          userData.photo = await googleBucketService.getImage(userData.photo);
        }

        userData.rating = userRating;
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAuthUser(token) {
    try {
      const userId = tokenService.getUserIdFromToken(token);
      const pool = await sql.connect(dbConfig);

      let userRating = 0
      const userRatingArr = await pool.request().query(`SELECT ratingValue FROM [Coach_ratings] WHERE coachId = ${userId}`)
      if (userRatingArr.recordset.length > 0) {
        userRating =
          userRatingArr.recordset.reduce((acc, currentValue) => acc + currentValue.ratingValue, 0) /
          userRatingArr.recordset.length;
      }

      const user = await pool.request().query(`SELECT * FROM [User] WHERE id = ${userId}`);
      if (user.recordset.length > 0) {
        const userData = user.recordset[0];

        if (userData.photo) {
          userData.photoUrl = await googleBucketService.getImage(userData.photo);
        }

        userData.rating = userRating;
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllUsers(role) {
    try {
      const pool = await sql.connect(dbConfig);

      // Select users with their ratings (if available) from Coach_ratings
      const allUsers = await pool.request().query(`
      SELECT u.*
      FROM [User] u
      LEFT JOIN [Coach_ratings] cr ON u.id = cr.id
      WHERE u.role = '${role}' AND u.is_banned = 0
    `);
      const users = allUsers.recordset;

      return await Promise.all(users.map(async (user) => {
        if (user.photo) {
          user.photo = await googleBucketService.getImage(user.photo);
        }

        let userRating = 0
        const userRatingArr = await pool.request().query(`SELECT ratingValue FROM [Coach_ratings] WHERE coachId = ${user.id}`)
        if (userRatingArr.recordset.length > 0) {
          userRating =
            userRatingArr.recordset.reduce((acc, currentValue) => acc + currentValue.ratingValue, 0) /
            userRatingArr.recordset.length;
        }

        user.rating = userRating;
        return user;
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllUsersWithFilters(role, sport_type, minAge, maxAge, minExp, maxExp, minPrice, maxPrice, sort_by){
    const pool = await sql.connect(dbConfig);
    let query = `SELECT * FROM [User] WHERE role = '${role}' AND is_banned = 0`;

    if (sport_type !== undefined) {
      const allSportTypes = sport_type.split(',').map(g => `'${g}'`).join(', ');
      query += ` AND (sport_type IN (${allSportTypes}))`;
    }

    if (minAge !== undefined || maxAge !== undefined) {
      minAge === undefined ? minAge  = 0 : minAge;
      maxAge === undefined ? maxAge = 100 : maxAge;
      query += ` AND (age BETWEEN ${minAge} AND ${maxAge})`;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      minPrice === undefined ? minPrice  = 0 : minPrice;
      maxPrice === undefined ? maxPrice = 1000000 : maxPrice;
      query += ` AND (price BETWEEN ${minPrice} AND ${maxPrice})`;
    }

    if (minExp !== undefined || maxExp !== undefined) {
      minExp === undefined ? minExp  = 0 : minExp;
      maxExp === undefined ? maxExp = 100 : maxExp;
      query += ` AND (experience BETWEEN ${minExp} AND ${maxExp})`;
    }

    const sortMap = {
      fromMinAge: 'age',
      fromMaxAge: 'age DESC',
      fromMinExp: 'experience',
      fromMaxExp: 'experience DESC',
      fromMinPrice: 'price',
      fromMaxPrice: 'price DESC',
      fromMinRate: 'rating',
      fromMaxRate: 'rating DESC',
    };

    if (sort_by !== undefined && sortMap[sort_by] !== undefined) {
      sort_by = sortMap[sort_by];
      query += ` ORDER BY ${sort_by}`;
    }
    
    const filteringUsers = await pool.request().query(query);

    return await Promise.all(filteringUsers.recordset.map(async (user) => {
      if (user.photo) {
        const imageUrl = await googleBucketService.getImage(user.photo);
        return {...user, photo: imageUrl};
      }
      return filteringUsers.recordset;
    }));
  }

  //todo
  async deleteUser(userId){
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`DELETE FROM [User] WHERE id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //todo
  async getUserHistory(userId){
    try {
      // todo order by
      await pool.request().query(`SELECT * FROM User_History WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //todo
  async getBannedUser(){
    try {
      await pool.request().query(`SELECT * FROM User WHERE is_banned = 1`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //todo
  async addBannedUser(userId){
    try {
      await pool.request().query(`UPDATE User SET is_banned = 0 WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //todo
  async removeBannedUser(userId){
    try {
      await pool.request().query(`UPDATE User SET is_banned = 1 WHERE Id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addReport(recipientId, token, reason){
    try {
      const pool = await sql.connect(dbConfig);
      const senderId = await tokenService.getUserIdFromToken(token);
      const checkSenderId = await pool.request().query(`SELECT * FROM [User_reports] WHERE senderId = ${senderId}`);
      if(checkSenderId.recordset.length > 0){
        throw ApiError.BadRequest("You have already filed a complaint against the user");
      }
      await pool.request().query(`INSERT INTO [User_reports] (reason, senderId, recipientId) 
      VALUES ('${reason}', ${senderId}, ${recipientId})`);
      return "Report sent";
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

      return 'Feedback sent';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addCommentToCoach(coachId, token, text) {
    try {
      const pool = await sql.connect(dbConfig);
      const senderId = await tokenService.getUserIdFromToken(token);
      const checkSenderId = await pool.request().query(`SELECT * FROM [Coach_comments] WHERE senderId = ${senderId}`);

      if (checkSenderId.recordset.length > 0) {
        throw ApiError.BadRequest("You have already left a comment");
      }

      await pool.request().query(`
      INSERT INTO [Coach_comments] (text, senderId, coachId) 
      VALUES ('${text}', ${senderId}, ${coachId})
    `);

      return "Comment sent";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getLastServiceComments() {
    try {
      const pool = await sql.connect(dbConfig);
      const commentsQuery = await pool.request().query(
        `SELECT TOP 6 sc.description, sc.date, u.name, u.lastname, u.photo
      FROM [Service_comments] sc
      JOIN [User] u ON sc.user_id = u.id
      ORDER BY sc.date DESC;`);

      // We modify each entry by replacing the value of the photo field using the link to the photo
      return await Promise.all(commentsQuery.recordset.map(async (comment) => {
        const imageUrl = await googleBucketService.getImage(comment.photo);
        return {...comment, photo: imageUrl};
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new UserService();