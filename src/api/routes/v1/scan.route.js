const express = require("express");
const {
  electric,
  water,
  organic,
  getElectricData,
  getWaterData,
  getOrganicData,
  getEcoScore,
  getAverageUnits,
} = require("../../controllers/scannerController");
const ScanRouter = express.Router();
const { authorize, LOGGED_USER } = require("../../middlewares/auth");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

ScanRouter.route("/electric").post(
  authorize(LOGGED_USER),
  upload.single("image"),
  electric
);
ScanRouter.route("/electric").get(authorize(LOGGED_USER), getElectricData);

ScanRouter.route("/water").post(
  authorize(LOGGED_USER),
  upload.single("image"),
  water
);
ScanRouter.route("/water").get(authorize(LOGGED_USER), getWaterData);

ScanRouter.route("/organic").post(
  authorize(LOGGED_USER),
  upload.single("image"),
  organic
);
ScanRouter.route("/organic").get(authorize(LOGGED_USER), getOrganicData);
ScanRouter.route("/ecoScore").get(authorize(LOGGED_USER), getEcoScore);
ScanRouter.route("/avgUnits").get(authorize(LOGGED_USER), getAverageUnits);

module.exports = ScanRouter;
