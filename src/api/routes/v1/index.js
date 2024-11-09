const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const marketplaceRoutes = require("./marketplace.route");
const scanRoutes = require("./scan.route");
const fetchChart = require("./chartRoute");
const tips = require("./tips.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/marketplace", marketplaceRoutes);
router.use("/scan", scanRoutes);
router.use("/fetchChart", fetchChart);
router.use("/tips", tips);

module.exports = router;
