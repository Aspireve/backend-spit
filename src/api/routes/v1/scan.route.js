const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../../controllers/imageController");
const ScanRouter = express.Router();
const { authorize, LOGGED_USER } = require("../../middlewares/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

ScanRouter.route("/electric").post(
  authorize(LOGGED_USER),
  upload.single("image"),
  uploadImage
);

module.exports = ScanRouter;
