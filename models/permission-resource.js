const mongoose = require('mongoose');

const { Schema } = mongoose;

const resourceSchema = new Schema({
  name: String,
});

resourceSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('PermissionResource', resourceSchema);
