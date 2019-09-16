const mongoose = require('mongoose');

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
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
});

module.exports = mongoose.model('Student', studentSchema);
