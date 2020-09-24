const context = require('../services/db_context');

module.exports = {
  all: async (req, res) => {
    const fees = await context.fees.find(
      { school: req.school },
      'name amount tranches'
    );

    return res.json(fees);
  },

  one: async (req, res) => {
    const fee = await context.fees.one(req.params.id, 'name amount tranches');

    return res.json(fee);
  },

  add: async (req, res) => {
    const fee = await context.fees.add(req.body);

    return res.json(fee);
  },

  update: async (req, res) => {
    const fee = await context.fees.update(req.params.id, req.body);

    return res.json(fee);
  },

  remove: async (req, res) => {
    const fee = await context.fees.delete(req.params.id);

    return res.json(fee);
  },
};
