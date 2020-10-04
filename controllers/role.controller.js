const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const roles = await context.roles.find()
    res.json(roles);
  },
};
