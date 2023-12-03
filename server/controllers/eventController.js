const eventService = require("../service/eventService");
const tokenService = require("../service/tokenService");

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
    try {
      const { continents, sort_by } = req.query;
      const filteringReady = await eventService.getEventsWithFilters(continents, sort_by);
      res.json(filteringReady);
    } catch (e) {
      next(e);
    }
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

  async addUserToEvent(req, res, next){
    try {
      const { token, eventId } = req.body;
      const userId = tokenService.getUserIdFromToken(token);
      return res.json(await eventService.addUserToEvent(+eventId, +userId));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EventControllers();
