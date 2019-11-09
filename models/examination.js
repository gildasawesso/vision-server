const mongoose = require('mongoose');

const { Schema } = mongoose;

const markSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', autopopulate: true },
  mark: Number,
});

markSchema.plugin(require('mongoose-autopopulate'));

const examinationSchema = new Schema({
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', autopopulate: true },
  schoolYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear', autopopulate: true },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject', autopopulate: true },
  type: { type: Schema.Types.ObjectId, ref: 'ExaminationType', autopopulate: true },
  marks: [markSchema],
  examinationDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

examinationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Examination', examinationSchema);
