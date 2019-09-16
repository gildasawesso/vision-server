const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  job: String,
  password: String,
  roles: [Schema.Types.ObjectId],
});

userSchema.plugin(timestamps);
module.exports = mongoose.model('User', userSchema);
