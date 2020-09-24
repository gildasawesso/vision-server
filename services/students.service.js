const { Registration } = require('../models');
const DbContext = require('./db_set');

const Admissions = new DbContext(Registration);

module.exports = {
  getStudents: async (classroomId, schoolyearId) => {
    return Admissions.find({ classroom: classroomId, schoolYear: schoolyearId });
  },

  removeStudent: async studentId => {},
};
