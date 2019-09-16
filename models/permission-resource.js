const mongoose = require('mongoose');

const { Schema } = mongoose;

const resourceSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('PermissionResource', resourceSchema);
