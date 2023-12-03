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
      const { name, lastname, age, role, experience, sport_type, country, city, mail, password, img, price_per_lesson } = req.body;
      const userData = await userService.registration(name, lastname, +age, +experience, sport_type, country, city, mail, password, role, img, +price_per_lesson );
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

  async getAuthUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = await userService.getAuthUser(token);
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const { role } = req.query
      const allUser = await userService.getAllUsers(role);
      return res.json(allUser);
    } catch (e) {
      next(e)
    }
  }

  async getAllUsersWithFilters(req, res, next) {
    try {
      const { role, sport_type, minAge, maxAge, minExp, maxExp, minPrice, maxPrice, sort_by } = req.query;
      const allFilteringUsers = await userService.getAllUsersWithFilters(role, sport_type, minAge, maxAge, minExp, maxExp, minPrice, maxPrice, sort_by);
      return res.json(allFilteringUsers);
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
      const token = req.headers.authorization.split(" ")[1];
      const {recipientId, value} = req.body;
      res.json(await userService.addReport(recipientId, token, value));
    } catch (e) {
      next(e)
    }
  }

  async getLastServiceComments(req, res, next){
    try {
      const comments = await userService.getLastServiceComments();
      res.json(comments);
    } catch (e) {
      next(e)
    }
  }

  async addCommentToService(req, res, next){
    try {
      const {text} = req.body;
      const token = req.headers.authorization.split(" ")[1];
      return res.json(await userService.addCommentToService(token, text));
    } catch (e) {
      next(e)
    }
  }

  async addCommentToCoach(req, res, next){
    try {
      const {coachId, value} = req.body;
      console.log(req.body);
      const token = req.headers.authorization.split(" ")[1];
      res.json(await userService.addCommentToCoach(coachId, token, value));
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new UserControllers();
