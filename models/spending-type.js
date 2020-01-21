const mongoose = require('mongoose');

const { Schema } = mongoose;

const spendingTypeSchema = new Schema({
  name: String,
  school: { type: Schema.Types.ObjectId, ref: 'School', autopopulate: true },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

spendingTypeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('SpendingType', spendingTypeSchema);
