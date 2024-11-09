const express = require("express");
const multer = require("multer");
const marketController = require("../../controllers/marketplace.controller");
const { authorize, LOGGED_USER } = require("../../middlewares/auth");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
router
  .route("/isRecycleable")
  .post(
    authorize(LOGGED_USER),
    upload.single("image"),
    marketController.isRecycleable
  );

router
  .route("/provideAmount")
  .get(
    authorize(LOGGED_USER),
    marketController.provideAmount
  );

module.exports = router;
