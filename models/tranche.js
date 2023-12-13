const mongoose = require('mongoose');

const { Schema } = mongoose;

const trancheSchema = new Schema({
  name: String,
  amount: Number,
  dueDate: Date,
});

trancheSchema.plugin(require('mongoose-timestamp'));
trancheSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Tranche', trancheSchema);
