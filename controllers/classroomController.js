const { Examination, ExaminationType, SchoolYear } = require('../models');
const { studentsForClassroom, allStudents } = require('../services/classroom.service');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const DbContext = require('../services/db_context');

const SchoolYears = new DbContext(SchoolYear);

module.exports = {
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
