const { Registration } = require('../models');
const DbContext = require('../services/db_set');
const context = require('../services/db_context');
const { lastYearRegistrations } = require('../services/students.service');
const Registrations = new DbContext(Registration);

module.exports = {
  add: async (req, res) => {
    const data = req.body;

    let registration = await Registrations.add(data);

    registration = await Registrations.one(registration._id);

    await res.json(registration);
  },

  update: async (req, res) => {
    const data = req.body;

    let registration = await Registrations.update(req.params.id, data);

    registration = await Registrations.one(registration._id);

    await res.json(registration);
  },

  all: async (req, res) => {
    const registrations = await context.registrations.Model
      .find({ school: req.school, schoolYear: req.schoolYear })
      .lean()
      .populate('classroom', 'name')
      .populate('schoolYear', 'startDate endDate')
      .populate('student', 'firstname lastname');

    return res.json(registrations);
  },

  one: async (req, res) => {
    const registrations = await context.registrations.one(req.params.id);

    return res.json(registrations);
  },

  student: async (req, res) => {
    const registration = await context.registrations.findOne({schoolYear: req.schoolYear, student: req.params.id})
      .lean()
      .populate('classroom', 'name')
      .populate('schoolYear', 'startDate endDate')
      .populate('student');
    return res.json(registration);
  },

  reductions: async (req, res) => {
    const registration = await context.registrations.findOne({ student: req.params.id });
    res.json(registration.reductions ?? []);
  },

  genders: async (req, res) => {
    const registration = await context.registrations.Model.find({ schoolYear: req.schoolYear, school: req.school })
      .populate('student', 'gender')
      .lean();

    const students = registration.map(r => r.student);
    let girls = 0;
    let boys = 0;
    students.forEach(student => {
      if (student.gender === 'M') {
        boys += 1;
      } else if (student.gender === 'F') {
        girls += 1;
      }
    });
    res.json({
      girls,
      boys
    });
  },

  delete: async (req, res) => {
    const registration = await Registrations.delete(req.params.id);

    await res.json(registration);
  },

  lastYear: async (req, res) => {
    const registrations = await lastYearRegistrations(req.school);
    res.json(registrations);
  }
};
