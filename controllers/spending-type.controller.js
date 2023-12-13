const { SpendingType } = require('../models');
const { userSchool } = require('../services/users.service');
const DbContext = require('../services/db_set');

const SpendingTypes = new DbContext(SpendingType);

module.exports = {
  async list(req, res) {
    const spendingTypes = await SpendingTypes.all(await userSchool(req.auth._id));

    await res.json(spendingTypes);
  },

  async create(req, res) {
    const spendingType = await SpendingTypes.add(req.body);

    return res.json(spendingType);
  },

  async update(req, res) {
    const { id } = req.params;
    const spendingType = await SpendingTypes.update(id, req.body);

    return res.json(spendingType);
  },

  async remove(req, res) {
    const { id } = req.params;
    const spendingType = await SpendingTypes.update(id, { deleted: true });

    return res.json(spendingType);
  },
};
