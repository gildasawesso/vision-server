const { Registration } = require('../models');
const DbContext = require('../services/db_context');

const Registrations = new DbContext(Registration);

module.exports = {
  add: async (req, res) => {
    const data = req.body;

    const registration = await Registrations.add(data);

    await res.json(registration);
  },

  all: async (req, res) => {
    const registrations = await Registrations.all();

    await res.json(registrations);
  },
};
