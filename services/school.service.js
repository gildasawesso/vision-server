const { School } = require('../models');

async function getSchools() {
  return School.find();
}

async function getSchool(id) {
  return School.findOne({ _id: id });
}

async function addSchool(data) {
  const school = new School(data);

  return school.save();
}

module.exports.getSchools = getSchools;
module.exports.getSchool = getSchool;
module.exports.addSchool = addSchool;
