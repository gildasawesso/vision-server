const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: String,
  code: String,
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
});

subjectSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Subject', subjectSchema);
