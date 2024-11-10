const express = require("express");

const tipsRouter = express.Router();

const { authorize, LOGGED_USER } = require("../../middlewares/auth");
const {
  getEnergySavingTips,
  getWaterConservationTips,
} = require("../../controllers/tips.controller");

tipsRouter.route("/energy").get(authorize(LOGGED_USER), getEnergySavingTips);
tipsRouter
  .route("/water")
  .get(authorize(LOGGED_USER), getWaterConservationTips);

module.exports = tipsRouter;
