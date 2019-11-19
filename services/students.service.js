const { Registration } = require('../models');
const DbContext = require('../services/db_context');

const Admissions = new DbContext(Registration);

module.exports = {
  getStudents: async (classroomId, schoolyearId) => {
    return Admissions.find({ classroom: classroomId, schoolYear: schoolyearId });
  },
};