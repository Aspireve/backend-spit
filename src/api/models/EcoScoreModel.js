const mongoose = require("mongoose");

const { Schema } = mongoose;

const ecoScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ecoScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EcoScore", ecoScoreSchema);
