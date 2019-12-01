const moment = require('moment');

const { SchoolYear, User } = require('../models');
const DbContext = require('../services/db_context');

const SchoolYears = new DbContext(SchoolYear);

module.exports = {
  getCurrentSchoolYear: async () => {
    const schoolYears = await SchoolYears.all();
    const now = moment();

    return schoolYears.find(s => {
      const start = moment(s.startDate);
      const end = moment(s.endDate);

      return now.isSameOrAfter(start) && now.isSameOrBefore(end);
    });
  },

  getCurrentSession: async () => {
    const schoolYears = await SchoolYears.all();
    const now = moment();

    const schoolYear = schoolYears.find(s => {
      const start = moment(s.startDate);
      const end = moment(s.endDate);

      return now.isSameOrAfter(start) && now.isSameOrBefore(end);
    });

    return schoolYear.sessions.find(s => {
      const start = moment(s.startDate);
      const end = moment(s.endDate);

      return now.isSameOrAfter(start) && now.isSameOrBefore(end);
    });
  },

  getSchoolYears: () => {
    return SchoolYear.find();
  },

  getSchoolYearsForUser: async _id => {
    const user = await User.findById(_id);

    return SchoolYear.find({ school: user.schools[0] });
  },

  getSchoolYear: id => {
    return SchoolYear.findOne({ _id: id });
  },

  addSchoolYear: data => {
    const schoolYear = new SchoolYear(data);

    return schoolYear.save();
  },

  addSession: async (id, data) => {
    const schoolYear = await SchoolYear.findById(id);

    schoolYear.sessions.push(data);

    return schoolYear.save();
  },

  removeSession: async (schoolYearId, sessionId) => {
    const schoolYear = await SchoolYear.findById(schoolYearId);

    schoolYear.sessions.id(sessionId).remove();

    return schoolYear.save();
  },
};
