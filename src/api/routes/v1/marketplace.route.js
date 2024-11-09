const express = require("express");
const marketController = require("../../controllers/marketplace.controller");
const { authorize, LOGGED_USER } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/electricityBill")
  .post(authorize(LOGGED_USER), marketController.getElectricityBillDetails);

module.exports = router;
