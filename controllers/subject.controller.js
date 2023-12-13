const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const subjects = await context.subjects.find({school: req.school})
    res.json(subjects);
  },

  one: async (req, res) => {
    const subject = await context.subjects.one(req.params.id);
    res.json(subject);
  },

  add: async (req, res) => {
    const payload = { ...req.body, school: req.school };
    const subject = await context.subjects.add(payload);
    res.json(subject);
  },

  update: async (req, res) => {
    const payload = { ...req.body, school: req.school };
    const subject = await context.subjects.update(req.params.id, payload);
    res.json(subject);
  },

  delete: async (req, res) => {
    const subject = await context.subjects.delete(req.params.id);
    res.json(subject);
  },
};
