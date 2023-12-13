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
      .Model.find(selection, 'name code registrationFee schoolFee reregistrationFee')
      .lean()
      .populate('_registrationFee', 'amount')
      .populate('_reRegistrationFee', 'amount')
      .populate('_schoolFee', 'amount')
      .populate('_subjects')
      .populate('subjects');

    return res.json(classrooms);
  },

  one: async (req, res) => {
    const classroom = await context.classrooms.Model
      .findById(req.params.id)
      .lean()
      .populate('_registrationFee')
      .populate('subjects')
      .populate('_reRegistrationFee')
      .populate('_schoolFee')
      .populate('_teacher')
      .populate('_subjects');

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
    const students = await studentsForClassroom(req.params.classroomId, req.schoolYear);
    await res.json(students);
  },

  update: async (req, res) => {
    const payload = {
      ...req.body,
      subjects: req.body._subjects,
    };
    const classroomUpdated = await context.classrooms.update(req.params.id, payload);
    const classroom = await context.classrooms.Model
      .findById(classroomUpdated._id)
      .lean()
      .populate('_registrationFee')
      .populate('_reRegistrationFee')
      .populate('_schoolFee')
      .populate('_teacher')
      .populate('_subjects');

    res.json(classroom);
  },

  add: async (req, res) => {
    const payload = {
      ...req.body,
      subjects: req.body._subjects,
      teacher: req.body._teacher,
      school: req.school,
    };
    const classroomAdded = await context.classrooms.add(payload)

    const classroom = await context.classrooms.one(classroomAdded._id)
      .lean()
      .populate('_registrationFee')
      .populate('_reRegistrationFee')
      .populate('_schoolFee')
      .populate('_teacher')
      .populate('_subjects');
    res.json(classroom);
  },

  delete: async (req, res) => {
    const classroom = await context.classrooms.Model.findById(req.params.id);
    await classroom.remove();
    res.json(classroom);
  },
};
