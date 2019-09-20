const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: String,
  code: String,
  capacity: Number,
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  registrationFee: { type: Schema.Types.ObjectId, ref: 'Fee', autopopulate: true },
  schoolFee: { type: Schema.Types.ObjectId, ref: 'Fee', autopopulate: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

classroomSchema.plugin(require('mongoose-autopopulate'));
classroomSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Classroom', classroomSchema);
