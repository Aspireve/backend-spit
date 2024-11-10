const express = require("express");

const chartRouter = express.Router();
const { authorize, LOGGED_USER } = require("../../middlewares/auth");
const {
  electricChart,
  waterChart,
  organicChart,
} = require("../../controllers/chartController");

chartRouter.route("/electric").get(authorize(LOGGED_USER), electricChart);
chartRouter.route("/water").get(authorize(LOGGED_USER), waterChart);
chartRouter.route("/organic").get(authorize(LOGGED_USER), organicChart);

module.exports = chartRouter;
