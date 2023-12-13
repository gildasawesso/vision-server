const moment = require('moment');

const { SchoolYear, User } = require('../models');
const DbContext = require('./db_set');

const SchoolYears = new DbContext(SchoolYear);

module.exports = {
  getCurrentSchoolYear: async () => {
    const schoolYears = await SchoolYears.all();
    const now = moment();

    const schoolyear = schoolYears.find(s => {
      const start = moment(s.startDate);
      const end = moment(s.endDate);

      return now.isSameOrAfter(start) && now.isSameOrBefore(end);
    });

    if (schoolyear === undefined) {
      return schoolYears.find(s => {
        const end = moment(s.endDate);

        return now.isSame(end, 'year');
      });
    }

    return schoolyear;
  },

  getCurrentSession: async () => {
    const schoolYears = await SchoolYears.all();
    const now = moment();

    const schoolYear = await module.exports.getCurrentSchoolYear();

    let currentSession = schoolYear.sessions.find(s => {
      const start = moment(s.startDate);
      const end = moment(s.endDate);

      return now.isSameOrAfter(start) && now.isSameOrBefore(end);
    });

    if (currentSession === undefined) {
      currentSession = schoolYear.sessions[schoolYear.sessions.length - 1];
    }

    return currentSession;
  },

  getSchoolYears: () => {
    return SchoolYear.find();
  },

  getSchoolYearsForUser: async _id => {
    const user = await User.findById(_id);

    return SchoolYear.find({ school: user.schools[0] });
  },

  updateSchoolYear: (id, data) => {
    return SchoolYear.findByIdAndUpdate({ _id: id }, data);
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
