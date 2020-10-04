const context = require('../services/db_context');
const userService = require('../services/students.service');

module.exports = {
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
      boys,
    });
  },

  classroomEffectif: async (req, res) => {
    const classrooms = await context.classrooms.find({ school: req.school });
    const result = await Promise.all(classrooms.map(async classroom => {
      return context.registrations.count({ classroom: classroom, schoolYear: req.schoolYear });
    }));
    res.json(result);
  },

  classroomEffectifByGenre: async (req, res) => {
    const classrooms = await context.classrooms.find({ school: req.school });
    const result = await Promise.all(classrooms.map(async classroom => {
      const registraitons = await context.registrations.Model.find({ classroom: classroom, schoolYear: req.schoolYear })
        .populate('student').lean();
      const eff = [0, 0];
      registraitons.forEach(registration => {
        const student = registration.student;
        if (student.gender === 'M') {
          eff[0] += 1;
        } else {
          eff[1] += 1;
        }
      });
      return eff;
    }));
    res.json(result);
  },

  pastAndNewStudents: async (req, res) => {
    const currentYearRegistrations = await context.registrations.find({ school: req.school, schoolYear: req.schoolYear });

    let pastStudents = 0;
    let newStudents = 0;
    currentYearRegistrations.forEach(registration => {
      if (registration.isNewStudent) {
        newStudents += 1;
      } else {
        pastStudents += 1;
      }
    });
    return res.json([newStudents, pastStudents]);
  },

  schoolPayments: async (req, res) => {
    const payments = await context.payments.find({ school: req.school, schoolYear: req.schoolYear });
    let totalPayments = 0;
    let registrationPayments = 0;
    let schoolFeesPayments = 0;
    let otherPayments = 0;

    for (const payment of payments) {
      const classroom = await context.classrooms.one(payment.classroom);
      totalPayments += payment.amount;
      payment.paymentLines.forEach(line => {
        if (line.fee === classroom.registrationFee.toString() || line.fee === classroom.reregistrationFee.toString()) {
          registrationPayments += line.amount;
        } else if (line.fee === classroom.schoolFee.toString()) {
          schoolFeesPayments += line.amount;
        } else {
          otherPayments += line.amount;
        }
      });
    }

    res.json([totalPayments, registrationPayments, schoolFeesPayments, otherPayments]);
  }
};
