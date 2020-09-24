const { Classroom, Registration } = require('../models');
const DbContext = require('./db_set');

const Classrooms = new DbContext(Classroom);
const Registrations = new DbContext(Registration);

module.exports = {
  studentsForClassroom: async (classroomId, schoolyearId) => {
    const registrations = await Registrations.find({ classroom: classroomId, schoolYear: schoolyearId });

    return registrations.map(registration => registration.student);
  },

  allStudents: async schoolyearId => {
    return Registrations.find({ schoolYear: schoolyearId });
  },
};
