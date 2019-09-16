const mongoose = require('mongoose');

const { Schema } = mongoose;

const mediaSchema = new Schema({
  filename: String,
});

module.exports = mongoose.model('Media', mediaSchema);
