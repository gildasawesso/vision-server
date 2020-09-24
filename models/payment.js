const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const { getCode } = require('../services/common.service');

const { Schema } = mongoose;

const contributionSchema = new Schema({
  code: String,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  schoolYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
  registrationFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  schoolFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  paymentLines: [Schema.Types.Mixed],
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
  paymentDate: { type: Date, default: Date.now },
  amount: Number,
  school: { type: Schema.Types.ObjectId, ref: 'School' },
});

contributionSchema.plugin(timestamps);

contributionSchema.pre('save', async function preSave(next) {
  const payment = this;

  payment.code = await getCode('paymentId');
  next();
});

module.exports = mongoose.model('Payment', contributionSchema);
