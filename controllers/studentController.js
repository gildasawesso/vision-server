const { addStudent, getAllStudents, updateStudent } = require('../services/student.service');

module.exports = {
  add: async (req, res) => {
    const data = req.body;

    console.log(data);
    const student = await addStudent(data);

    await res.json(student);
  },

  get: async (req, res) => {
    const students = await getAllStudents();

    await res.json(students);
  },

  getOne: () => {},

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const studentUpdated = await updateStudent(id, data);

    await res.json(studentUpdated);
  },

  delete: () => {},
};
