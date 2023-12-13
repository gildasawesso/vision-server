const mongoose = require('mongoose');

const { Schema } = mongoose;

const schoolSessionSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
});

const schoolYearSchema = new Schema({
  startDate: Date,
  endDate: Date,
  sessions: [schoolSessionSchema],
  school: { type: Schema.Types.ObjectId, ref: 'School' },
});

module.exports = mongoose.model('SchoolYear', schoolYearSchema);
