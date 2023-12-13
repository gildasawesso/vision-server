const mongoose = require('mongoose');

const { Schema } = mongoose;

const incomeSchema = new Schema({
  name: String,
  school: { type: Schema.Types.ObjectId, ref: 'School' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Income', incomeSchema);
