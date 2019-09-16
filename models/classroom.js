const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: String,
  code: String,
  capacity: Number,
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  registrationFee: { type: Schema.Types.ObjectId, ref: 'Fee', autopopulate: true },
  scholarship: { type: Schema.Types.ObjectId, ref: 'Fee', autopopulate: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

classroomSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Classroom', classroomSchema);
