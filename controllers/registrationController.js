const { Registration } = require('../models');
const DbContext = require('../services/db_set');
const context = require('../services/db_context');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const { userSchool } = require('../services/users.service');

const Registrations = new DbContext(Registration);

module.exports = {
  add: async (req, res) => {
    const data = req.body;

    let registration = await Registrations.add(data);

    registration = await Registrations.one(registration._id);

    await res.json(registration);
  },

  update: async (req, res) => {
    const data = req.body;

    let registration = await Registrations.update(req.params.id, data);

    registration = await Registrations.one(registration._id);

    await res.json(registration);
  },

  all: async (req, res) => {
    const school = await userSchool(req.auth._id);
    const { schoolyear } = req.query;
    const registrations = await context.registrations.find({ school, schoolYear: schoolyear });

    return res.json(registrations);
  },

  one: async (req, res) => {
    const registrations = await context.registrations.one(req.params.id);

    return res.json(registrations);
  },

  reductions: async (req, res) => {
    const registration = await context.registrations.findOne({ student: req.params.id });
    res.json(registration.reductions);
  },

  delete: async (req, res) => {
    const registration = await Registrations.delete(req.params.id);

    await res.json(registration);
  },

  lastYear: async (req, res) => {
    const schoolYears = await context.schoolYears.find({}, {}, { sort: { _id: -1 } });

    if (schoolYears.length === 0) {
      return res.json([]);
    }

    if (schoolYears.length === 1) {
      const registrations = await context.registrations.Model.find({ school: req.school })
        .populate('classroom', 'name')
        .populate('student', 'firstname lastname')
        .lean();

      return res.json(registrations);
    }

    if (schoolYears.length === 2) {
      const currentYear = schoolYears[0];
      const registrations = await context.registrations.Model.find({ registrationDate: { $lt: currentYear.startDate }, school: req.school })
        .populate('classroom', 'name')
        .populate('student', 'firstname lastname')
        .lean();

      return res.json(registrations);
    }

    const lastyear = schoolYears[1];
    const beforeLastYear = schoolYears[2];
    const registrations = await context.registrations.Model.find({
      registrationDate: { $gt: beforeLastYear.endDate, $lt: lastyear.endDate },
      school: req.school
    })
      .populate('classroom', 'name')
      .populate('student', 'firstname lastname')
      .lean();

    return res.json(registrations);
  },
};

async function currentYearRegistrations(school) {
  const schoolYears = await context.schoolYears.find({}, {}, { sort: { _id: -1 } });

  if (schoolYears.length === 0) {
    return [];
  }

  if (schoolYears.length === 1) {
    return context.registrations.all(school);
  }

  if (schoolYears.length >= 2) {
    const lastyear = schoolYears[1];

    return context.registrations.find({ registrationDate: { $gt: lastyear.endDate } });
  }

  return [];
}
