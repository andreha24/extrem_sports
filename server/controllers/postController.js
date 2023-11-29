const postService = require("../service/postService");
const tokenService = require("../service/tokenService");

class PostControllers {
  async getAllPosts(req, res, next){
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userId = await tokenService.getUserIdFromToken(token);
      return res.json(await postService.getAllPosts(userId));
    } catch (e) {
      next(e);
    }
  }

  async addPost(req, res, next){
    try {
      const { topic, text, token } = req.body;
      const userId = await tokenService.getUserIdFromToken(token);
      await postService.addPost(topic, text, userId);
    } catch (e) {
      next(e);
    }
  }

  async editPost(req, res, next){
    try {
      const { topic, text, postId } = req.body;
      await postService.editPost(topic, text, postId);
    } catch (e) {
      next(e);
    }
  }


  async deletePost(req, res, next){
    try {
      const { id } = req.params;
      await postService.deletePost(id);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostControllers();
