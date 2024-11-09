const mongoose = require("mongoose");

const { Schema } = mongoose;

const organicModel = new Schema(
  {
    amount: String,
    billDate: String,
    kilo: String,
    type: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("organicData", organicModel);
