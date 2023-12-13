const { Registration } = require('../models');
const DbContext = require('./db_set');
const context = require('./db_context');

const Admissions = new DbContext(Registration);

module.exports = {
  getStudents: async (classroomId, schoolyearId) => {
    return Admissions.find({ classroom: classroomId, schoolYear: schoolyearId });
  },

  lastYearRegistrations: async (schoolId) => {
    const schoolYears = await context.schoolYears.find({}, {}, { sort: { _id: -1 } });

    if (schoolYears.length === 0) {
      return [];
    }

    if (schoolYears.length === 1) {
      return await context.registrations.Model.find({ school: schoolId })
        .lean()
        .populate('classroom', 'name')
        .populate('student', 'firstname lastname');
    }

    if (schoolYears.length === 2) {
      const currentYear = schoolYears[0];
      return await context.registrations.Model.find({
        registrationDate: { $lt: currentYear.startDate },
        school: schoolId
      })
        .lean()
        .populate('classroom', 'name')
        .populate('student', 'firstname lastname');

    }

    const lastyear = schoolYears[1];
    const beforeLastYear = schoolYears[2];
    return await context.registrations.Model.find({
      registrationDate: { $gt: beforeLastYear.endDate, $lt: lastyear.endDate },
      school: schoolId
    })
      .lean()
      .populate('classroom', 'name')
      .populate('student', 'firstname lastname');

  },
};
