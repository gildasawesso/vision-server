const mongoose = require('mongoose');

const { Schema } = mongoose;

const markSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', autopopulate: true },
  mark: Number,
});

const examinationSchema = new Schema({
  classroomId: { type: Schema.Types.ObjectId, ref: 'Classroom', autopopulate: true },
  schoolYearId: { type: Schema.Types.ObjectId, ref: 'SchoolYear', autopopulate: true },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', autopopulate: true },
  typeId: { type: Schema.Types.ObjectId, ref: 'ExaminationType', autopopulate: true },
  marks: [markSchema],
  schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
  examinationDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

examinationSchema.virtual('classroom', {
  ref: 'Classroom',
  localField: 'classroomId',
  foreignField: '_id',
  justOne: true
});

examinationSchema.virtual('schoolYear', {
  ref: 'SchoolYear',
  localField: 'schoolYearId',
  foreignField: '_id',
  justOne: true
});

examinationSchema.virtual('subject', {
  ref: 'Subject',
  localField: 'subjectId',
  foreignField: '_id',
  justOne: true
});

examinationSchema.virtual('type', {
  ref: 'ExaminationType',
  localField: 'typeId',
  foreignField: '_id',
  justOne: true
});

examinationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Examination', examinationSchema);
