const context = require('../services/db_context');

module.exports = {
  get: async (req, res) => {
    const examinationTypes = await context.examinationTypes.find({schoolId: req.school});
    return res.json(examinationTypes);
  },

  one: async (req, res) => {
    const examinationType = await context.examinationTypes.one(req.params.id);
    return res.json(examinationType);
  },

  add: async (req, res) => {
    const data = req.body;
    const examinationType = await context.examinationTypes.add(data);
    return res.json(examinationType);
  },

  update: async (req, res) => {
    const examinationType = await context.examinationTypes.update(req.params.id, req.body);
    return res.json(examinationType);
  },

  delete: async (req, res) => {
    const examinationType = await context.examinationTypes.delete(req.params.id);
    await res.json(examinationType);
  }
};
