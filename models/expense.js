const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseSchema = new Schema({
  name: String,
  school: { type: Schema.Types.ObjectId, ref: 'School' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);
