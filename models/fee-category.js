const mongoose = require('mongoose');

const { Schema } = mongoose;

const feeCategorySchema = new Schema({
  name: String,
});

feeCategorySchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('FeeCategory', feeCategorySchema);
