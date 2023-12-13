const mongoose = require('mongoose');

const { Schema } = mongoose;

const examinationTypeSchema = new Schema({
  name: String,
  group: Number,
  displayOrder: Number,
  schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
});

module.exports = mongoose.model('ExaminationType', examinationTypeSchema);
