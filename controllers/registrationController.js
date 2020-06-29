const { Registration } = require('../models');
const DbContext = require('../services/db_context');

const Registrations = new DbContext(Registration);

module.exports = {
  add: async (req, res) => {
    const data = req.body;

    let registration = await Registrations.add(data);

    registration = await Registrations.one(registration._id);

    await res.json(registration);
  },

  update: async (req, res) => {
    const data = req.body;

    let registration = await Registrations.update(req.params.id, data);

    registration = await Registrations.one(registration._id);

    await res.json(registration);
  },

  all: async (req, res) => {
    const registrations = await Registrations.all();

    await res.json(registrations);
  },

  delete: async (req, res) => {
    const registration = await Registrations.delete(req.params.id);

    await res.json(registration);
  },
};
