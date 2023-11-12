const coachService = require("../service/coachService");

class CoachControllers {
  async getAllClients(req, res, next){
    try {
      const { coachId } = req.body;
      await coachService.getAllClients(coachId);
    } catch (e) {
      next(e);
    }
  }

  async getClientsWithFilters(req, res, next){

  }

  async deleteClient(req, res, next){
    try {
      const { coachId, clientId } = req.body;
      await coachService.deleteClient(coachId, clientId);
    } catch (e) {
      next(e);
    }
  }

  async addClient(req, res, next){
    try {
      const { coachId, clientId } = req.body;
      await coachService.addClient(coachId, clientId);
    } catch (e) {
      next(e);
    }
  }

  async getTopClients(req, res, next){
    try {
      const { coachId } = req.body;
      await coachService.getTopClients(coachId);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CoachControllers();
