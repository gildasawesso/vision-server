const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const { Schema } = mongoose;

const schoolSchema = new Schema({
  name: String,
  subName: String,
  zipCode: String,
  address: String,
  phone: String,
  mobile: String,
  email: String,
  logo: { type: Schema.Types.ObjectId, ref: 'Media' },
});

schoolSchema.plugin(timestamps);

module.exports = mongoose.model('School', schoolSchema);
