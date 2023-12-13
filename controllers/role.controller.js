const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const roles = await context.roles.find({ schoolId: req.school });
    res.json(roles);
  },

  one: async (req, res) => {
    const role = await context.roles.one(req.params.id);
    res.json(role);
  },

  add: async (req, res) => {
    const payload = { ...req.body, school: req.school };
    const role = await context.roles.add(payload);
    res.json(role);
  },

  update: async (req, res) => {
    const payload = { ...req.body, school: req.school };
    const role = await context.roles.update(req.params.id, payload);
    res.json(role);
  },

  delete: async (req, res) => {
    const role = await context.roles.delete(req.params.id);
    res.json(role);
  },
};
