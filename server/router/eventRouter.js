const { Router } = require("express");
const router = Router();

const eventController = require("../controllers/eventController");

router.post("/addEvent", eventController.addEvent)
  .get("/events", eventController.getAllEvents)
  .delete("/deleteEvent", eventController.removeEvent)
  .get("/eventsWithFilters", eventController.getEventsWithFilters);

module.exports = router;