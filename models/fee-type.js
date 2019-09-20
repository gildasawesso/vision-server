const mongoose = require('mongoose');

const { Schema } = mongoose;

const feeTypeSchema = new Schema({
  name: String,
});

feeTypeSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('FeeType', feeTypeSchema);
