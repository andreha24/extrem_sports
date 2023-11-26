const { Router } = require("express");
const router = Router();

const userController = require("../controllers/userController");

router.get("/serviceComments", userController.getLastServiceComments);

module.exports = router;