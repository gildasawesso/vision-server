const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: String,
  code: String,
  capacity: Number,
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  registrationFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  schoolFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  reregistrationFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  createdAt: { type: Date, default: Date.now },
  school: { type: Schema.Types.ObjectId, ref: 'School' },
});

classroomSchema.virtual('_schoolFee', {
  ref: 'FeeType',
  localField: 'schoolFee',
  foreignField: '_id',
  justOne: true
});

classroomSchema.virtual('_registrationFee', {
  ref: 'FeeType',
  localField: 'registrationFee',
  foreignField: '_id',
  justOne: true
});

classroomSchema.virtual('_reRegistrationFee', {
  ref: 'FeeType',
  localField: 'reregistrationFee',
  foreignField: '_id',
  justOne: true
});

classroomSchema.virtual('_teacher', {
  ref: 'Teacher',
  localField: 'teacher',
  foreignField: '_id',
  justOne: true
});

classroomSchema.virtual('_subjects', {
  ref: 'Subject',
  localField: 'subjects',
  foreignField: '_id'
});

module.exports = mongoose.model('Classroom', classroomSchema);
