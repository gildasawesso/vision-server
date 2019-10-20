const mongoose = require('mongoose');

const { Schema } = mongoose;

const permissionSchema = new Schema({
  name: String,
  description: String,
});

permissionSchema.plugin(require('mongoose-timestamp'));

module.exports = mongoose.model('Permission', permissionSchema);
