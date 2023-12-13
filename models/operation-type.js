const mongoose = require('mongoose');

const { Schema } = mongoose;

const operationTypeSchema = new Schema({
  name: String,
  type: { type: String, enum: ['add', 'spend'] },
});

module.exports = mongoose.model('OperationType', operationTypeSchema);
