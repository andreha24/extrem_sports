const googleBucketService = require("../service/googleBucketService");

class googleBucketControllers {

  async addUserPhoto(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided.' });
      }

      const imageUrl = await googleBucketService.addImage(req.file.buffer, req.file.originalname);

      res.json({ imageUrl });
    } catch (e) {
      next(e);
    }
  }

  async editUserPhoto(req, res, next){
    try {
      const { topic, text, postId } = req.body;
      await postService.editPost(topic, text, postId);
    } catch (e) {
      next(e);
    }
  }


  async deleteUserPhoto(req, res, next){
    try {
      const { postId } = req.body;
      await postService.deletePost(postId);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new googleBucketControllers();
