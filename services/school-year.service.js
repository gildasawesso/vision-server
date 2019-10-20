const { SchoolYear } = require('../models');
const { User } = require('../models');

async function getSchoolYears() {
  return SchoolYear.find();
}

async function getSchoolYearsForUser(_id) {
  const user = await User.findById(_id);

  return SchoolYear.find({ school: user.schools[0] });
}

async function getSchoolYear(id) {
  return SchoolYear.findOne({ _id: id });
}

async function addSchoolYear(data) {
  const schoolYear = new SchoolYear(data);

  return schoolYear.save();
}

async function addSession(id, data) {
  const schoolYear = await SchoolYear.findById(id);

  schoolYear.sessions.push(data);

  return schoolYear.save();
}

async function removeSession(schoolYearId, sessionId) {
  const schoolYear = await SchoolYear.findById(schoolYearId);

  schoolYear.sessions.id(sessionId).remove();

  return schoolYear.save();
}

module.exports.getSchoolYears = getSchoolYears;
module.exports.getSchoolYear = getSchoolYear;
module.exports.addSchoolYear = addSchoolYear;
module.exports.addSession = addSession;
module.exports.removeSession = removeSession;
module.exports.userSchoolYears = getSchoolYearsForUser;
