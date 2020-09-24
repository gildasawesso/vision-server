const moment = require('moment');

const context = require('../services/db_context');
const { userSchool } = require('../services/users.service');

module.exports = {
  get: async (req, res) => {
    const payments = await context.payments.find({school: req.school, schoolYear: req.schoolYear});

    return res.json(payments);
  },

  student: async (req, res) => {
    const { id } = req.params;
    const { _id } = req.auth;
    const payments = await context.payments.find({ student: id, school: await userSchool(_id) });

    return res.json(payments);
  },

  classrooms: async (req, res) => {
    const schoolYear = req.schoolYear;
    const school = req.school;
    const classrooms = await context.classrooms.find({school});
    const classroomPayments = await Promise.all(
      classrooms.map(async classroom => {
        const registrations = await context.registrations.find({ classroom, schoolYear });
        const classroomStudentspayments = await Promise.all(
          registrations.map(async registration => {
            const { student } = registration;

            if (student === undefined || student == null) return [null, null];

            const studentPayments = await context.payments.find({ student, schoolYear });

            return [student._id, studentPayments];
          })
        );

        return [classroom._id, { students: Object.fromEntries(classroomStudentspayments) }];
      })
    );

    return res.json({
      classrooms: Object.fromEntries(classroomPayments),
    });
  },

  update: async (req, res) => {

  },

  add: async (req, res) => {
    const payload = req.body;
    const payment = await context.payments.add(payload);
    res.json(payment);
  },

  delete: async (req, res) => {

  }
};
