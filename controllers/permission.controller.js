const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const permissions = await context.permissions.find();
    res.json(permissions);
  },
};
