const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: Number,
  name: String,
  operation: { type: String, enum: ['income', 'expense'] },
  date: { type: Date, default: Date.now },
  transactionDate: { type: Date, default: Date.now },
  transactionTypeId: { type: Schema.Types.ObjectId, ref: 'TransactionType' },
  schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
  schoolYearId: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
});

transactionSchema.virtual('transactionType', {
  ref: 'TransactionType',
  localField: 'transactionTypeId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
