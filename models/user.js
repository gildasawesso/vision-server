const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  gender: String,
  job: String,
  password: String,
  disabled: Boolean,
  schools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', userSchema);
