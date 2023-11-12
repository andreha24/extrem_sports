const { Router } = require("express");
const router = Router();

const coachController = require("../controllers/coachController");

router.post("/addClient", coachController.addClient)
  .get("/clients", coachController.getAllClients)
  .delete("/deleteClient", coachController.deleteClient)
  .get("/topClients", coachController.getTopClients)
  .get("/clientsWithFilters", coachController.getClientsWithFilters);

module.exports = router;