const { Student } = require('../models');
const DbContext = require('../services/db_context');

const Students = new DbContext(Student);

module.exports = {
  add: async (req, res) => {
    const data = req.body;

    let student = await Students.add(data);

    student = await Students.one(student._id);

    await res.json(student);
  },

  get: async (req, res) => {
    const students = await Students.all();

    await res.json(students);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const studentUpdated = await Students.update(id, data);

    await res.json(studentUpdated);
  },

  delete: async (req, res) => {
    const student = await Students.delete(req.params.id);

    await res.json(student);
  },
};
