const sql = require('mssql');

const dbConfig = require("../dbConnection");

const pool = await sql.connect(dbConfig);

class EventService {
  async getAllPosts(userId){
    try {
      await pool.request().query(`SELECT * FROM Post WHERE user_id = ${userId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addPost(topic, text, userId){
    try {
      await pool.request().query(`INSERT INTO Post (topic, text, userId) 
      VALUES ('${topic}','${text}', '${userId}')`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editPost(topic, text, postId){
    try {
      await pool.request().query(`UPDATE Post SET topic = '${topic}' text = '${text}'  WHERE id = ${postId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePost(postId){
    try {
      await pool.request().query(`DELETE FROM Post WHERE id = ${postId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new EventService();