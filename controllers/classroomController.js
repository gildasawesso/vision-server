const { Examination, ExaminationType, SchoolYear } = require('../models');
const { studentsForClassroom, allStudents } = require('../services/classroom.service');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const DbContext = require('../services/db_set');
const context = require('../services/db_context');
const { userSchool } = require('../services/users.service');

const SchoolYears = new DbContext(SchoolYear);

module.exports = {
  all: async (req, res) => {
    const selection = { school: req.school };
    const classrooms = await context.classrooms
      .Model.find(selection, 'name code registrationFee schoolFee reregistrationFee');

    return res.json(classrooms);
  },

  one: async (req, res) => {
    const classroom = await context.classrooms.one(req.params.id);
    return res.json(classroom);
  },

  getAllStudents: async (req, res) => {
    const { schoolYearId } = req.query;
    let currentSchoolYear = await SchoolYears.one(schoolYearId);

    if (schoolYearId === undefined) {
      currentSchoolYear = await getCurrentSchoolYear();
    }

    const students = await allStudents(currentSchoolYear._id);

    await res.json(students);
  },

  getStudents: async (req, res) => {
    const { schoolYearId, classroomId } = req.params;
    let currentSchoolYear = await SchoolYears.one(schoolYearId);

    if (schoolYearId === undefined) {
      currentSchoolYear = await getCurrentSchoolYear();
    }

    const students = await studentsForClassroom(classroomId, currentSchoolYear._id);

    await res.json(students);
  },
};
