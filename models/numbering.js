const mongoose = require('mongoose');

const { Schema } = mongoose;

const numberingSchema = new Schema({
  studentId: { type: Number, default: 0 },
  paymentId: { type: Number, default: 0 },
});

module.exports = mongoose.model('Numbering', numberingSchema);
