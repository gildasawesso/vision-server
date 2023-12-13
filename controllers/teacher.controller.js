const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const teachers = await context.teachers.find({school: req.school}, null, { sort: { lastname: 1 } });
    res.json(teachers);
  },

  add: async (req, res) => {
    const payload = { ...req.body, school: req.school };
    const teacher = await context.teachers.add(payload);
    res.json(teacher);
  },

  remove: async (req, res) => {
    const teacher = await context.teachers.delete(req.params.teacherId);
    res.json(teacher);
  },

  update: async (req, res) => {
    const teacher = await context.teachers.update(req.params.teacherId, req.body);
    res.json(teacher);
  }
};
