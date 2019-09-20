const mongoose = require('mongoose');

const { getCode } = require('../services/common.service');

const { Schema } = mongoose;

const studentSchema = new Schema({
  firstname: String,
  lastname: String,
  birthday: Date,
  matricule: String,
  gender: String,
  status: String,
  birthCity: String,
  fathersFirstname: String,
  fathersLastname: String,
  mothersFirstname: String,
  mothersLastname: String,
  fathersJob: String,
  mothersJob: String,
  fathersPhone: String,
  mothersPhone: String,
  address: String,
  lastClass: String,
  lastSchool: String,
  dropOut: { type: Boolean, default: false },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
});

studentSchema.plugin(require('mongoose-timestamp'));

studentSchema.pre('save', async function preSave(next) {
  const student = this;

  student.matricule = await getCode('studentId');
  next();
});

module.exports = mongoose.model('Student', studentSchema);
