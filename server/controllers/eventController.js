const eventService = require("../service/eventService");

class EventControllers {
  async getAllEvents(req, res, next){
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (e) {
      next(e);
    }
  }

  async getEvent(req, res, next){
    try {
      const { id } = req.params;
      const event = await eventService.getEvent(id);
      res.json(event[0]);
    } catch (e) {
      next(e);
    }
  }

  async getEventsWithFilters(req, res, next){

  }

  async addEvent(req, res, next){
    try {
      const { name, description, continent, country, city, start_date, people, img } = req.body;
      await eventService.addEvent(name, description, continent, country, city, start_date, people, img);
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
