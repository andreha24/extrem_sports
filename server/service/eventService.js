const sql = require('mssql');

const googleBucketService = require("./googleBucketService");
const ApiError = require("../exeptions/apiErrors");
const dbConfig = require("../dbConnection");

class EventService {
  async getAllEvents() {
    try {
      const pool = await sql.connect(dbConfig);
      const events = await pool.request().query(`SELECT * FROM [Events]`);

      return await Promise.all(events.recordset.map(async (event) => {
        if (event.preview) {
          const imageUrl = await googleBucketService.getImage(event.preview);
          return {...event, preview: imageUrl};
        }
        return event;
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

//todo
  async getEventsWithFilters(){

  }

  async getEvent(id){
    try {
      const pool = await sql.connect(dbConfig);
      const event = await pool.request().query(`SELECT * FROM [Events] WHERE id = ${id}`);

      const listOfUsers = await pool.request().query(`SELECT [User].id, [User].name, [User].lastname FROM [User]
      JOIN [Events_users] ON [User].id = [Events_users].user_id
      WHERE [Events_users].event_id = ${id};`);

      return await Promise.all(event.recordset.map(async (event) => {
        if (event.preview) {
          const imageUrl = await googleBucketService.getImage(event.preview);
          return {...event, preview: imageUrl, registeredUsers: listOfUsers.recordset};
        }
        return event[0];
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async addEvent(name, description, continent, country, city, startDate, people, img){
    const pool = await sql.connect(dbConfig);
    const event = await sql.query`SELECT * FROM [Events] WHERE name = ${name}`;

    if (event.recordset.length > 0) {
      throw ApiError.BadRequest(`Соревнование ${name} уже существует`);
    }

    await pool.request().query(`INSERT INTO [Events] (name, description, country, city, start_date, people, continent, preview) 
    VALUES ('${name}','${description}', '${country}', '${city}', '${startDate}', ${people}, '${continent}', '${img}' )`);
  }

  //todo
  async removeEvent(eventId){
    try {
      await pool.request().query(`DELETE FROM Event WHERE id = ${eventId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addUserToEvent(eventId, userId){
    try {
      const pool = await sql.connect(dbConfig);
      const user = await pool.request().query(`SELECT * FROM [Events_users] WHERE user_id = ${userId} AND event_id = ${eventId}`);
      if (user.recordset.length > 0) {
        throw ApiError.BadRequest(`Вы уже зарегистрированы`);
      }
      await pool.request().query(`INSERT INTO [Events_users] (user_id, event_id) VALUES (${userId}, ${eventId})`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new EventService();