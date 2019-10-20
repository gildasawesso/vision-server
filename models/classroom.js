const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: String,
  code: String,
  capacity: Number,
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', autopopulate: true },
  registrationFee: { type: Schema.Types.ObjectId, ref: 'FeeType', autopopulate: true },
  schoolFee: { type: Schema.Types.ObjectId, ref: 'FeeType', autopopulate: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject', autopopulate: true }],
});

classroomSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Classroom', classroomSchema);
