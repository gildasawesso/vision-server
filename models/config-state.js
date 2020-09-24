const mongoose = require('mongoose');

const { Schema } = mongoose;

const configState = new Schema({
  master: Boolean,

  code: String,
});

module.exports = mongoose.model('ConfigState', configState);
