const { Examination, ExaminationType } = require('../models');
const DbContext = require('../services/db_context');

const Examinations = new DbContext(Examination);
const ExaminationTypes = new DbContext(ExaminationType);

module.exports = {
  get: async (req, res) => {},

  add: async (req, res) => {
    const data = req.body;

    const examination = await Examinations.add(data);

    await res.json(examination);
  },

  update: async (req, res) => {},

  delete: async (req, res) => {
    const examinations = await Examinations.all();

    await res.json(examinations);
  },

  getTypes: async (req, res) => {
    const examinationTypes = await ExaminationTypes.all();

    await res.json(examinationTypes);
  },

  addType: async (req, res) => {
    const data = req.body;
    const examinationType = await ExaminationTypes.add(data);

    await res.json(examinationType);
  },

  updateType: () => {},

  deleteType: async (req, res) => {
    const { id } = req.params;

    const examinationType = await ExaminationTypes.delete(id);

    await res.json(examinationType);
  },
};
