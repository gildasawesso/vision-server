const { Student, Registration } = require('../models');
const DbContext = require('../services/db_set');
const context = require('../services/db_context');

const Students = new DbContext(Student);
const Registrations = new DbContext(Registration);



module.exports = {
  arrangeStudents: async (req, res) => {
    const data = req.body;
    const names = data.names;

    let students = await Students.find();

    students = students.reduce((acc, student) => {
      const studentMatched = names.reduce((acc, name) => {
        if (name.toLowerCase().indexOf(student.lastname.toLowerCase()) > 0 && name.toLowerCase().indexOf(student.firstname.toLowerCase()) > 0) {
          acc.push(student);
          return acc;
        }
        return acc;
      }, []);

      return [...acc, ...studentMatched];
    }, []);

    await res.json(students);
  },
};
