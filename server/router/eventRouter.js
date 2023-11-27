const { Router } = require("express");
const router = Router();

const eventController = require("../controllers/eventController");

router.post("/addEvent", eventController.addEvent)
  .get("/allEvents", eventController.getAllEvents)
  .get("/event/:id", eventController.getEvent)
  .delete("/deleteEvent", eventController.removeEvent)
  .get("/eventsWithFilters", eventController.getEventsWithFilters);

module.exports = router;