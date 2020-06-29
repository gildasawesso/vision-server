const mongoose = require('mongoose');

const { Schema } = mongoose;

const trancheSchema = new Schema({
  name: String,
  dueDate: Date,
  amount: Number,
});

const feeSchema = new Schema({
  name: String,
  amount: Number,
  isSchoolFee: Boolean,
  tranches: [trancheSchema],
  deadline: Date,
  feeCategory: { type: Schema.Types.ObjectId, ref: 'FeeCategory', autopopulate: true },
});

feeSchema.plugin(require('mongoose-autopopulate'));
feeSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('FeeType', feeSchema);
