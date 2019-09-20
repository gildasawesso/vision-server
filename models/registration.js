const mongoose = require('mongoose');

const { Schema } = mongoose;

const registrationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
  schoolYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
});

registrationSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Registration', registrationSchema);
