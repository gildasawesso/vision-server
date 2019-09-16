const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: String,
  code: String,
  professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
});

module.exports = mongoose.model('Subject', subjectSchema);
