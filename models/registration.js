const mongoose = require('mongoose');

const { Schema } = mongoose;

const reductionSchema = new Schema({
  fee: { type: Schema.Types.ObjectId, ref: 'FeeType', autopopulate: true },
  reductionType: String,
  reduction: Number,
});

const registrationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', autopopulate: true },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', autopopulate: true },
  schoolYear: { type: Schema.Types.ObjectId, ref: 'SchoolYear', autopopulate: true },
  isReregistration: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
  feesReduction: { type: Number, default: 0 },
  reductions: [reductionSchema],
});

registrationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Registration', registrationSchema);
