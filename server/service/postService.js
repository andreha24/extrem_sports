const sql = require('mssql');

const dbConfig = require("../dbConnection");

class PostService {

  async getAllPersonalPosts(userId){
    try {
      const pool = await sql.connect(dbConfig);
      const allPosts = await pool.request().query(`SELECT * FROM [Posts] WHERE user_id = ${userId} ORDER BY dateOfCreation DESC`);
      return allPosts.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllUserPosts(userId){
    try {
      const pool = await sql.connect(dbConfig);
      const allPosts = await pool.request().query(`SELECT * FROM [Posts] WHERE user_id = ${userId} ORDER BY dateOfCreation DESC`);
      return allPosts.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addPost(topic, text, userId){
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`INSERT INTO [Posts] (topic, text, user_id)  VALUES ('${topic}','${text}', ${userId})`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //todo
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
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`DELETE FROM [Posts] WHERE id = ${postId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new PostService();