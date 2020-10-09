const { Examination, ExaminationType } = require('../models');
const { getStudents } = require('../services/students.service');
const { getCurrentSchoolYear } = require('../services/school-year.service');
const DbContext = require('../services/db_set');
const context = require('../services/db_context');

const Examinations = new DbContext(Examination);
const ExaminationTypes = new DbContext(ExaminationType);

function isRegistrationInMarks(marks, registration) {
  return marks.find(m => m.student._id.toString() === registration.student._id.toString()) !== undefined;
}

module.exports = {
  get: async (req, res) => {
    const examinations = await context.examinations.Model.find({
      schoolId: req.school,
      schoolYearId: req.schoolYear,
    })
      .lean()
      .populate('subject', 'code')
      .populate('classroom', 'name')
      .populate('marks.student', '_id mark')
      .populate('type', 'name')
      .sort({ _id: -1 });

    return res.json(examinations);

    // const examinations = await context.examinations.Model.find({
    //   schoolId: req.school,
    //   schoolYearId: req.schoolYear,
    // }, '-marks')
    //   .lean()
    //   .populate('subject', 'code')
    //   .populate('classroom', 'name')
    //   .populate('type', 'name')
    //   .sort({ _id: -1 });
    //
    // return res.json(examinations);
  },

  one: async (req, res) => {
    const examination = await context.examinations.Model.findById(req.params.id)
      .lean()
      .populate('subject', 'code markBy')
      .populate('classroom', 'name')
      .populate('type', 'name');

    examination.marks = await Promise.all(examination.marks.map(async mark => {
      const student = await context.students.one(mark.student);
      return {
        ...mark,
        student,
      };
    }));

    return res.json(examination);
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
