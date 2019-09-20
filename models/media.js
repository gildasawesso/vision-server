const mongoose = require('mongoose');

const { Schema } = mongoose;

const mediaSchema = new Schema({
  filename: String,
});

mediaSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Media', mediaSchema);
