const mongoose = require('mongoose');

const { Schema } = mongoose;

const permissionSchema = new Schema({
  name: String,
  resource: { type: Schema.Types.ObjectId, ref: 'AppResource' },
});

module.exports = mongoose.model('Permission', permissionSchema);
