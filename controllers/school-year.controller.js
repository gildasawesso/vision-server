const moment = require('moment');

const {
  getSchoolYearsForUser,
  getSchoolYear,
  addSchoolYear,
  addSession,
  removeSession,
  getCurrentSession,
  getCurrentSchoolYear,
} = require('../services/school-year.service');
const DbContext = require('../services/db_context');
const { SchoolYear } = require('../models');

const SchoolYears = new DbContext(SchoolYear);

module.exports = {
  list: async (req, res) => {
    const { _id } = req.auth;
    const schoolYears = await getSchoolYearsForUser(_id);

    return res.json(schoolYears);
  },

  current: async (req, res) => {
    const schoolYear = await getCurrentSchoolYear();

    await res.json(schoolYear);
  },

  currentSession: async (req, res) => {
    const session = await getCurrentSession();

    await res.json(session);
  },

  show: async (req, res) => {
    const { id } = req.params;

    const schoolYear = await getSchoolYear(id);

    return res.json(schoolYear);
  },

  create: async (req, res) => {
    const schoolYear = await addSchoolYear(req.body);

    return res.json(schoolYear);
  },

  update(req, res) {
    const { id } = req.params;
  },

  remove(req, res) {
    const { id } = req.params;
  },

  addSession: async (req, res) => {
    const { id } = req.params;
    const schoolYear = await addSession(id, req.body);

    return res.json(schoolYear);
  },

  removeSession: async (req, res) => {
    const { id, sessionId } = req.params;
    const schoolYear = await removeSession(id, sessionId);

    return res.json(schoolYear);
  },
};
