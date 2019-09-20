const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  job: String,
  password: String,
  roles: [Schema.Types.ObjectId],
});

userSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('User', userSchema);
