const {
  userSchoolYears,
  getSchoolYear,
  addSchoolYear,
  addSession,
  removeSession,
} = require('../services/school-year.service');

module.exports = {
  list: async (req, res) => {
    const { _id } = req.auth;
    const schoolYears = await userSchoolYears(_id);

    return res.json(schoolYears);
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
