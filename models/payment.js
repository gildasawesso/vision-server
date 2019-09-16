const mongoose = require('mongoose');

const { Schema } = mongoose;

const contributionSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  schooYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
  fee: { type: Schema.Types.ObjectId, ref: 'Fee' },
  amount: Number,
});

module.exports = mongoose.model('Payment', contributionSchema);
