const sql = require('mssql');

const dbConfig = require("../dbConnection");
const PostDto = require("../dtos/postDto");

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

      const newPost = await pool.request().query(`SELECT * FROM [Posts] WHERE user_id = ${userId} AND topic = '${topic}' AND text = '${text}'`);
      const postDto = new PostDto(newPost.recordset[0]);
      return { post: postDto };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editPost(topic, text, postId){
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`UPDATE [Posts] SET topic = '${topic}', text = '${text}' WHERE id = ${postId}`);
      const editedPost = await pool.request().query(`SELECT * FROM [Posts] WHERE id = ${postId}`);
      const postDto = new PostDto(editedPost.recordset[0]);
      return { post: postDto, message: "Post edited" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePost(postId){
    try {
      const pool = await sql.connect(dbConfig);
      await pool.request().query(`DELETE FROM [Posts] WHERE id = ${postId}`);
      return {
        postId: postId,
        message: "Post deleted"
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


module.exports = new PostService();