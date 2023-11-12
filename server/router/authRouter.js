const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const userController = require("../controllers/userController");
// const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registration",
  // body("mail").isEmail(),
  // body("password").isLength({ min: 8, max: 32 }),
  userController.registration)
    .post("/login", userController.login)
    // .get("/", authMiddleware, userController.getUser)
    .patch("/changeUserData",
      body("mail").isEmail(),
      body("password").isLength({ min: 8, max: 32 }),
      userController.changeUserData);

module.exports = router;