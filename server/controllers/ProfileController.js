const { Profile } = require("../models");

class ProfileController {
  static async updateProfile(req, res, next) {
    try {
      const UserId = req.user.id;
      let profile = await Profile.findOne({ where: { UserId } });
      await profile.update(req.body);
      // console.log(profile);
      res.status(200).json({
        message: "Successfully update profile",
      });
    } catch (error) {
      console.log("🚀 ~ ProfileController ~ showGenres ~ error:", error);
      next(error);
    }
  }
}

module.exports = ProfileController;
