const { Student } = require('../models');

module.exports = {
  addStudent: async function addStudent(data) {
    const student = new Student(data);

    return student.save();
  },

  getAllStudents: async function getAllStudents() {
    return Student.find();
  },

  getOneStudent: async function getOneStudent(id) {
    return Student.findOne({ _id: id });
  },

  updateStudent: async function updateStudent(id, data) {
    return Student.findOneAndUpdate({ _id: id }, data, { new: true });
  },

  deleteStudent: async function deleteStudent(id) {
    return Student.findByIdAndRemove(id, { new: true });
  },
};
