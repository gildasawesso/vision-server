const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: String,
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

roleSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Role', roleSchema);
