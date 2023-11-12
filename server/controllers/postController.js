const postService = require("../service/postService");

class PostControllers {
  async getAllPosts(req, res, next){
    try {
      const { userId } = req.body;
      await postService.getAllPosts(userId);
    } catch (e) {
      next(e);
    }
  }

  async addPost(req, res, next){
    try {
      const { topic, text, userId } = req.body;
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
      const { postId } = req.body;
      await postService.deletePost(postId);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostControllers();
