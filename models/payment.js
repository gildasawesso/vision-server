const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const { getCode } = require('../services/common.service');

const { Schema } = mongoose;

const contributionSchema = new Schema({
  code: String,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  schooYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
  fee: { type: Schema.Types.ObjectId, ref: 'Fee' },
  amount: Number,
});

contributionSchema.plugin(timestamps);

contributionSchema.pre('save', async function preSave(next) {
  const payment = this;

  payment.code = await getCode('paymentId');
  next();
});

module.exports = mongoose.model('Payment', contributionSchema);
