const mongoose = require('mongoose');

const { Schema } = mongoose;

const feeTypeSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('FeeType', feeTypeSchema);
