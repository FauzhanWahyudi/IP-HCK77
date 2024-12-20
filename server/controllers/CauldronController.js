const { Cauldron, Potion } = require("../models");

class CauldronController {
  static async showCauldrons(req, res, next) {
    try {
      let cauldrons = await Cauldron.findAll({
        where: { UserId: req.user.id },
        include: {
          model: Potion,
        },
      });
      res.status(200).json({
        cauldrons,
      });
    } catch (error) {
      console.log("🚀 ~ CauldronController ~ showCauldrons ~ error:", error);
      next(error);
    }
  }

  static async updateCauldron(req, res, next) {
    try {
      const { cauldronId } = req.params;
      let cauldron = await Cauldron.findByPk(cauldronId);
      await cauldron.update(req.body);
      console.log(cauldron);
      res.status(200).json({
        message: "Successfully update cauldron",
      });
    } catch (error) {
      console.log("🚀 ~ CauldronController ~ updateCauldrons ~ error:", error);
      next(error);
    }
  }
}

module.exports = CauldronController;
