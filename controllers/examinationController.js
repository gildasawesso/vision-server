const { Examination, ExaminationType } = require('../models');
const { getStudents } = require('../services/students.service');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const DbContext = require('../services/db_set');

const Examinations = new DbContext(Examination);
const ExaminationTypes = new DbContext(ExaminationType);

function isRegistrationInMarks(marks, registration) {
  return marks.find(m => m.student._id.toString() === registration.student._id.toString()) !== undefined;
}

module.exports = {
  get: async (req, res) => {
    const examinations = await Examinations.find(null, null, { sort: { _id: -1 } });
    const schoolYear = await getCurrentSchoolYear();

    examinations.filter(e => e.schoolYear === schoolYear._id);

    await res.json(examinations);
  },

  add: async (req, res) => {
    const data = req.body;

    const { _id, classroom, schoolYear } = await Examinations.add(data);
    const registrations = await getStudents(classroom, schoolYear);
    const examination = await Examinations.one(_id);

    registrations.forEach(registration => {
      examination.marks.push({
        student: registration.student,
        mark: null,
      });
    });
    await examination.save();

    await res.json(examination);
  },

  updateStudents: async (req, res) => {
    const data = req.body;
    const { _id, classroom, schoolYear } = data;

    const registrations = await getStudents(classroom._id, schoolYear._id);
    const examination = await Examinations.one(_id);

    registrations.forEach(registration => {
      if (!isRegistrationInMarks(examination.marks, registration)) {
        examination.marks.push({
          student: registration.student,
          mark: null,
        });
      }
    });
    await examination.save();

    await res.json(examination);
  },

  update: async (req, res) => {
    const examination = await Examinations.update(req.params.id, req.body);

    await res.json(examination);
  },

  delete: async (req, res) => {
    const examination = await Examinations.delete(req.params.id);

    await res.json(examination);
  },

  getTypes: async (req, res) => {
    const examinationTypes = await ExaminationTypes.all();

    await res.json(examinationTypes);
  },

  addType: async (req, res) => {
    const data = req.body;
    const examinationType = await ExaminationTypes.add(data);

    await res.json(examinationType);
  },

  updateType: async (req, res) => {
    const examinationType = await ExaminationTypes.update(req.params.id, req.body);

    await res.json(examinationType);
  },

  deleteType: async (req, res) => {
    const { id } = req.params;

    const examinationType = await ExaminationTypes.delete(id);

    await res.json(examinationType);
  },
};
