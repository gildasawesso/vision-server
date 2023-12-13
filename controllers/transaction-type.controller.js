const context = require('../services/db_context');
const { operationsTypes } = require('../constants/constants');

module.exports = {
  all: async (req, res) => {
    const types = await context.transactionTypes.find({schoolId: req.school});
    res.json(types);
  },

  expense: async (req, res) => {
    const types = await context.transactionTypes.find({schoolId: req.school, type: operationsTypes.expense});
    res.json(types);
  },

  income: async (req, res) => {
    const types = await context.transactionTypes.find({schoolId: req.school, type: operationsTypes.income});
    res.json(types);
  },

  add: async (req, res) => {
    const type = await context.transactionTypes.add(req.body);
    res.json(type);
  },

  update: async (req, res) => {
    const type = await context.transactionTypes.update(req.params.id, req.body);
    res.json(type);
  },

  delete: async (req, res) => {
    const type = await context.transactionTypes.add(req.body);
    res.json(type);
  },
};
