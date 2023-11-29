const sql = require('mssql');
const ApiError = require('../exeptions/apiErrors')
const dbConfig = require("../dbConnection");

const pool = await sql.connect(dbConfig);

class CoachService {

  //todo
  async getAllClients(coachId){
    try {
      await pool.request().query(`SELECT * FROM Trainer_clients WHERE trainer_id = ${coachId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //todo
  async getClientsWithFilters(){

  }

  //todo
  async deleteClient(coachId, clientId){
    try {
      await pool.request().query(`DELETE FROM Trainer_clients WHERE trainer_id = ${coachId} AND client_id = ${clientId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //todo
  async addClient(coachId, clientId){
    try {
      await pool.request().query(`INSERT INTO Trainer_clients WHERE trainer_id = ${coachId} AND client_id = ${clientId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //todo
  async getTopClients(coachId){
    try {
      await pool.request().query(`SELECT * FROM Trainer_clients WHERE trainer_id = ${coachId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new CoachService();