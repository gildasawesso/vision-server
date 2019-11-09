const mongoose = require('mongoose');

const { Schema } = mongoose;

const examinationTypeSchema = new Schema({
  name: String,
  order: Number,
});

examinationTypeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ExaminationType', examinationTypeSchema);
