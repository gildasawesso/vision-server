const { School } = require('../models');
const context = require('./db_context');

async function getSchools() {
  return context.schools.all();
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
