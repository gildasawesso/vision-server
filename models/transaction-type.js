const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionTypeSchema = new Schema({
  name: String,
  type: { type: String, enum: ['income', 'expense'] },
  schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
});

module.exports = mongoose.model('TransactionType', transactionTypeSchema);
