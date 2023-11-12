const eventService = require("../service/eventService");

class EventControllers {
  async getAllEvents(req, res, next){
    try {
      await eventService.getAllEvents();
    } catch (e) {
      next(e);
    }
  }

  async getEventsWithFilters(req, res, next){

  }

  async addEvent(req, res, next){
    try {
      const { name, description, country, city, startDate, people } = req.body;
      await eventService.addEvent(name, description, country, city, startDate, people);
    } catch (e) {
      next(e);
    }
  }

  async removeEvent(req, res, next){
    try {
      const { eventId } = req.body;
      await eventService.removeEvent(eventId);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EventControllers();
