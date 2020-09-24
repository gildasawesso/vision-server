const { Examination, ExaminationType, SchoolYear } = require('../models');
const { studentsForClassroom, allStudents } = require('../services/classroom.service');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const DbContext = require('../services/db_set');
const context = require('../services/db_context');
const { userSchool } = require('../services/users.service');

const SchoolYears = new DbContext(SchoolYear);

module.exports = {
  all: async (req, res) => {

    const selection = {school: req.school};
    let classrooms = await context.classrooms.Model.find(selection).select('name code registrationFee schoolFee reregistrationFee').lean();
    return res.json(classrooms);
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
