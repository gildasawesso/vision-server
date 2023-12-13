const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = new Schema({
  firstname: String,
  lastname: String,
  gender: String,
  address: String,
  phone: String,
  qualifications: String,
  hireDate: { type: Date, default: Date.now },
  fireDate: Date,
  school: { type: Schema.Types.ObjectId, ref: 'School' },
});

teacherSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Teacher', teacherSchema);
