const { Router } = require("express");
const router = Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const googleBucketController = require("../controllers/googleBucketController");

router.post("/addPhoto", upload.single("img"), googleBucketController.addUserPhoto)
  .post("/editPhoto", upload.any(), googleBucketController.editUserPhoto);

module.exports = router;