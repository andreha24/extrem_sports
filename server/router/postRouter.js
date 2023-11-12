const { Router } = require("express");
const router = Router();

const postController = require("../controllers/postController");

router.post("/addPost", postController.addPost)
  .get("/posts", postController.getAllPosts)
  .delete("/deletePost", postController.deletePost)
  .patch("/editPost", postController.editPost);

module.exports = router;