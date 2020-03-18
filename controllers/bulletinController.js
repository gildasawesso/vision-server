const { Examination, ExaminationType, SchoolYear, School } = require('../models');
const { studentsForClassroom, allStudents } = require('../services/classroom.service');
const { getBulletins } = require('../services/bulletin.service');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const DbContext = require('../services/db_context');

const SchoolYears = new DbContext(SchoolYear);
const Schools = new DbContext(School);

module.exports = {
  classroomBulletin: async (req, res) => {
    const { schoolYearId, schoolId } = req.query;
    let currentSchoolYear = await SchoolYears.one(schoolYearId);
    const school = await Schools.one(schoolId);

    if (schoolYearId === undefined) {
      currentSchoolYear = await getCurrentSchoolYear();
    }

    const bulletins = await getBulletins(school, currentSchoolYear);

    await res.json(bulletins);
  },

  allClassroomsBulletin: async (req, res) => {

  },
};
