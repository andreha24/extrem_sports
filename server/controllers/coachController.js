const coachService = require("../service/coachService");
const tokenService = require("../service/tokenService");

class CoachControllers {
  async getAllClients(req, res, next){
    try {
      const { status } = req.query;
      const token = req.headers.authorization.split(" ")[1];
      const coachId = tokenService.getUserIdFromToken(token);
      res.json(await coachService.getAllClients(coachId, status));
    } catch (e) {
      next(e);
    }
  }

  async deleteClient(req, res, next){
    try {
      const { id } = req.params;
      const token = req.headers.authorization.split(" ")[1];
      const coachId = tokenService.getUserIdFromToken(token);
      return(await coachService.deleteClient(coachId, id));
    } catch (e) {
      next(e);
    }
  }

  async addClient(req, res, next){
    try {
      const { coachId, token } = req.body;
      res.json(await coachService.addClient(coachId, token));
    } catch (e) {
      next(e);
    }
  }

  async acceptClient(req, res, next){
    try {
      const { clientId, token } = req.body;
      const coachId = tokenService.getUserIdFromToken(token);
      res.json(await coachService.acceptClient(coachId, clientId));
    } catch (e) {
      next(e);
    }
  }

  async addCoachRating(req, res, next){
    try {
      const { userId, newRating, token } = req.body;
      res.json(await coachService.addCoachRating(+newRating, token, +userId));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CoachControllers();
