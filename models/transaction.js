const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  name: String,
  amount: Number,
  operation: { type: Schema.Types.ObjectId, ref: 'OperationType', autopopulate: true },
});

transactionSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Transaction', transactionSchema);
