const mongoose = require('mongoose');

const { Schema } = mongoose;

const trancheSchema = new Schema({
  name: String,
  dueDate: Date,
});

const feeSchema = new Schema({
  name: String,
  amount: Number,
  isSchoolFee: Boolean,
  tranches: [trancheSchema],
  deadline: Date,
  feeType: { type: Schema.Types.ObjectId, ref: 'FeeType', autopopulate: true },
});

feeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Fee', feeSchema);
