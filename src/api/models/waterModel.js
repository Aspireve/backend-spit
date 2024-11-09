const mongoose = require("mongoose");

const { Schema } = mongoose;

const waterModel = new Schema(
  {
    amount: String,
    billDate: String,
    dueDate: String,
    litres: String,
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

module.exports = mongoose.model("waterData", waterModel);
