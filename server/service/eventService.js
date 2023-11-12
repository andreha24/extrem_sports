const sql = require('mssql');

const ApiError = require("../exeptions/apiErrors");
const dbConfig = require("../dbConnection");

const pool = await sql.connect(dbConfig);

class EventService {
  async getAllEvents(){
    try {
      await pool.request().query(`SELECT * FROM Event`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEventsWithFilters(){

  }

  async addEvent(name, description, country, city, startDate, people){
    try {
      const event = await sql.query`SELECT * FROM Event WHERE name = ${name}`;

      if (event.recordset.length > 0) {
        throw ApiError.BadRequest(`Соревнование ${name} уже существует`);
      }

      await pool.request().query(`INSERT INTO Event (name, description, country, city, startDate, people) 
      VALUES ('${name}','${description}', '${country}', '${city}', '${startDate}', '${people}')`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeEvent(eventId){
    try {
      await pool.request().query(`DELETE FROM Event WHERE id = ${eventId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new EventService();