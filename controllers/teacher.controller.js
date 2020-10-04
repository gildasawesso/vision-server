const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const teachers = await context.teachers.find({school: req.school})
    res.json(teachers);
  },
};
