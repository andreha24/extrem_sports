const { Router } = require("express");
const router = Router();

const coachController = require("../controllers/coachController");

router.post("/addClient", coachController.addClient)
  .patch("/acceptClient", coachController.acceptClient)
  .get("/clients", coachController.getAllClients)
  .post("/addRating", coachController.addCoachRating)
  // .patch("/changeRating", coachController.addCoachRating) //todo
  .delete("/deleteClient/:id", coachController.deleteClient)

module.exports = router;