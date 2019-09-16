const mongoose = require('mongoose');

const { Schema } = mongoose;

const registrationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
  schoolYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
});

module.exports = mongoose.model('Registration', registrationSchema);
