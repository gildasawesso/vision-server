const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: String,
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

module.exports = mongoose.model('Role', roleSchema);
