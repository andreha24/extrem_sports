const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const userController = require("../controllers/userController");


router.get("/authUser", userController.getAuthUser)
  .get("/userHistory", userController.getUserHistory)
  .post("/addResult", userController.addNewResult)
  .delete("/deleteResult", userController.deleteResult)
  .post("/addReport", userController.addReport)
  .post("/addCommentToService", userController.addCommentToService)
  .post("/addCommentToCoach", userController.addCommentToCoach)
  .patch("/changeUserData",
    body("mail").isEmail(),
    userController.changeUserData)
  .delete("/deleteUser", userController.deleteUser);

module.exports = router;