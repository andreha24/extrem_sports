const { validationResult } = require("express-validator");

const userService = require("../service/userService");
const ApiError = require("../exeptions/apiErrors");

class UserControllers {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
      }
      const { name, lastname, experience, sport_type, country, city, email, password } = req.body;
      const userData = await userService.registration(name, lastname, experience, sport_type, country, city, email, password);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { mail, password } = req.body;
      const userData = await userService.login(mail, password)
      return res.json(userData)
    }
    catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const { userId } = req.body;
      await userService.getUser(userId);
      return res.json(req.user)
    } catch (e) {
      next(e)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      await userService.getAllUsers();
      // return res.json(req.user)
    } catch (e) {
      next(e)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.body;
      await userService.deleteUser(userId);
    } catch (e) {
      next(e)
    }
  }

  async changeUserData(req, res, next) {
    try {
      const {name, email, userId} = req.body;
      await userService.changeUserInfo(name, email, userId);
    } catch (e) {
      next(e)
    }
  }

  async getUserHistory(req, res, next) {
    try {
      const {userId} = req.body;
      await userService.getUserHistory(userId);
    } catch (e) {
      next(e)
    }
  }

  async getBannedUsers(req, res, next){
    try {
      const bannedUsers = await userService.getBannedUser();
      return res.json(bannedUsers);
    } catch (e) {
      next(e)
    }
  }

  async addBannedUser(req, res, next){
    try {
      const {userId} = req.body;
      await userService.addBannedUser(userId);
    } catch (e) {
      next(e)
    }
  }

  async removeBannedUser(req, res, next){
    try {
      const {userId} = req.body;
      await userService.removeBannedUser(userId);
    } catch (e) {
      next(e)
    }
  }

  async addReport(req, res, next){
    try {
      const {firstUserId, secondUserId, reason} = req.body;
      await userService.addReport(firstUserId, secondUserId, reason);
    } catch (e) {
      next(e)
    }
  }

  async addCommentToService(req, res, next){
    try {
      const {userId, text} = req.body;
      await userService.addCommentToService(userId, text);
    } catch (e) {
      next(e)
    }
  }

  async addCommentToCoach(req, res, next){
    try {
      const {userId, trainerId, text} = req.body;
      await userService.addCommentToCoach(userId, trainerId, text);
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new UserControllers();
