const { Router } = require("express");
const router = Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const googleBucketController = require("../controllers/googleBucketController");

router.post("/addUserPhoto", upload.single("img"), googleBucketController.addUserPhoto)
  // .delete("/deletePost", googleBucketController.deletePost)
  // .patch("/editPost", googleBucketController.editPost);

module.exports = router;