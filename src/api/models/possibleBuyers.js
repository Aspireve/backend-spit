const mongoose = require('mongoose');

/**
 * Refresh Token Schema
 * @private
 */
const possibleBuyerSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
    index: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

/**
 * @typedef PossibleBuyer
 */
const PossibleBuyer = mongoose.model('PossibleBuyer', possibleBuyerSchema);
module.exports = PossibleBuyer;
