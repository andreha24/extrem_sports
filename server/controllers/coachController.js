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
      await coachService.deleteClient(coachId, id);
    } catch (e) {
      next(e);
    }
  }

  async addClient(req, res, next){
    try {
      const { coachId, token } = req.body;
      const clientId = tokenService.getUserIdFromToken(token);
      const result = await coachService.addClient(coachId, clientId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async acceptClient(req, res, next){
    try {
      const { clientId, token } = req.body;
      const coachId = tokenService.getUserIdFromToken(token);
      await coachService.acceptClient(coachId, clientId);
      return `Client accepted`
    } catch (e) {
      next(e);
    }
  }

  async addCoachRating(req, res, next){
    try {
      const { userId, newRating, token } = req.body;
      const valuerId = await tokenService.getUserIdFromToken(token);
      await coachService.addCoachRating(+newRating, +valuerId, +userId);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CoachControllers();
