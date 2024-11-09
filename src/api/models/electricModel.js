const mongoose = require("mongoose");

const { Schema } = mongoose;

const electricModel = new Schema(
  {
    amount: String,
    billDate: String,
    dueDate: String,
    units: String,
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

module.exports = mongoose.model("electricData", electricModel);
