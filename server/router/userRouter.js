const { Router } = require("express");
const router = Router();

const userController = require("../controllers/userController");

router.get("/authUser", userController.getAuthUser)
  .get("/bannedUsers", userController.getBannedUsers)
  .patch("/addBannedUser", userController.addBannedUser)
  .delete("/deleteBannedUser", userController.removeBannedUser)
  .delete("/deleteUser", userController.deleteUser)
  .get("/userHistory", userController.getUserHistory)
  .post("/addReport", userController.addReport)
  .post("/addCommentToService", userController.addCommentToService)
  .post("/addCommentToCoach", userController.addCommentToCoach);

module.exports = router;