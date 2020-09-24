const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: String,
  code: String,
  capacity: Number,
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  registrationFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  schoolFee: { type: Schema.Types.ObjectId, ref: 'FeeType'},
  reregistrationFee: { type: Schema.Types.ObjectId, ref: 'FeeType' },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  createdAt: { type: Date, default: Date.now },
  school: { type: Schema.Types.ObjectId, ref: 'School' },
});

classroomSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Classroom', classroomSchema);
