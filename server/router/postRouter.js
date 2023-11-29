const { Router } = require("express");
const router = Router();

const postController = require("../controllers/postController");

router.post("/addPost", postController.addPost)
  .get("/getPosts", postController.getAllPosts)
  .delete("/deletePost/:id", postController.deletePost)
  .patch("/editPost", postController.editPost);

module.exports = router;