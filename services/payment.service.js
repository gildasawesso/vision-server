const moment = require('moment');

const context = require('./db_context');

module.exports = {
  studentPayments: async studentId => {
    const payments = await context.payments.find({ student: studentId });
  },
};
