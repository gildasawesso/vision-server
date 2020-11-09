const { Classroom, Registration } = require('../models');
const DbContext = require('./db_set');
const context = require('../services/db_context');

const Classrooms = new DbContext(Classroom);
const Registrations = new DbContext(Registration);



module.exports = {
  studentsForClassroom: async (classroomId, schoolyearId) => {
    const registrations = await context.registrations.Model
      .find({ classroom: classroomId, schoolYear: schoolyearId })
      .lean()
      .populate('student');
    return registrations.map(registration => registration.student);
  },

  allStudents: async schoolyearId => {
    return Registrations.find({ schoolYear: schoolyearId });
  },
};
