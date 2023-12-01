const sql = require('mssql');
const dbConfig = require("../dbConnection");

class CoachService {
  async getAllClients(coachId, status){
    try {
      const pool = await sql.connect(dbConfig);
      const allCoachClients = await pool.request()
        .query(`SELECT U.id, U.name, U.lastname, CC.athleteStatus, CC.dateOfApplication
          FROM [Coach_clients] CC
          JOIN [User] U ON CC.athleteId = U.id
          WHERE CC.coachId = ${coachId} AND athleteStatus='${status}';
         `);
      return allCoachClients.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteClient(coachId, clientId){
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`DELETE FROM [Coach_clients] WHERE coachId = ${coachId} AND athleteId = ${clientId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addClient(coachId, clientId){
    try {
      const pool = await sql.connect(dbConfig);
      const applicant = await pool.request().query(`SELECT * FROM [Coach_clients] WHERE coachId = ${coachId} AND athleteId = ${clientId}`);
      if (applicant.recordset.length > 0) {
        return `Вы уже подали заявление`;
      }
      await pool.request().query(`INSERT INTO [Coach_clients] (coachId, athleteId) VALUES (${coachId}, ${clientId})`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async acceptClient(coachId, clientId){
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`UPDATE [Coach_clients] SET athleteStatus='accepted' WHERE coachId = ${coachId} AND athleteId = ${clientId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addCoachRating(rating, valuerId, coachId) {
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`INSERT INTO [Coach_ratings] (ratingValue, valuerId, coachId) 
        VALUES (${rating}, ${valuerId}, ${coachId})`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new CoachService();