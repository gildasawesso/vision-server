const mongoose = require('mongoose');

async function getCode(incrementedField) {
  const Model = mongoose.model('Numbering');
  let codes = await Model.find().limit(1);

  if (codes.length <= 0) {
    const modelInstance = new Model();

    await modelInstance.save();
    codes = await Model.find().limit(1);
  }

  const code = codes[0];

  code[incrementedField] += 1;
  // eslint-disable-next-line no-underscore-dangle
  await Model.findOneAndUpdate(code._id, code);

  return code[incrementedField].toString().padStart(6, '0');
}

module.exports.getCode = getCode;
