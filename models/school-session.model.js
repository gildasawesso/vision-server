const mongoose = require('mongoose');

const { Schema } = mongoose;

const schoolSessionSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  schoolYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear' },
});

schoolSessionSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('SchoolSession', schoolSessionSchema);
