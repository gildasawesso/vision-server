const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const subjects = await context.subjects.find({school: req.school})
    res.json(subjects);
  },
};
