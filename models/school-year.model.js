const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

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
});

schoolYearSchema.plugin(timestamps);
module.exports = mongoose.model('SchoolYear', schoolYearSchema);
