const { Student, Registration } = require('../models');
const DbContext = require('../services/db_context');

const Students = new DbContext(Student);
const Registrations = new DbContext(Registration);

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

    const registrations = await Registrations.find({ student: student._id });

    if (registrations && registrations.length > 0) {
      await Registrations.delete(registrations[0]._id);
    }

    await res.json(student);
  },
};
