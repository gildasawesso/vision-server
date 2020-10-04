const context = require('../services/db_context');
const constants = require('../constants/constants');

module.exports = {
  all: async (req, res) => {
    const transactions = await context.transactions.Model
      .find({schoolId: req.school, schoolYearId: req.schoolYear})
      .sort({transactionDate: -1})
      .lean()
      .populate('transactionType', 'name');
    res.json(transactions);
  },

  balance: async (req, res) => {
    const expenseTransactions = await context.transactions.find({schoolId: req.school, schoolYearId: req.schoolYear, operation: constants.operationsTypes.expense});
    const revenuTransactions = await context.transactions.find({schoolId: req.school, schoolYearId: req.schoolYear, operation: constants.operationsTypes.income});
    const expenses = expenseTransactions.reduce((acc, cur) => acc + cur.amount, 0);
    const revenus = revenuTransactions.reduce((acc, cur) => acc + cur.amount, 0);
    res.json(revenus - expenses);
  },

  add: async (req, res) => {
    const tranactionLike = req.body;
    let transaction = await context.transactions.add(tranactionLike);
    transaction = await context.transactions.Model.findById(transaction._id)
      .lean()
      .populate('transactionType', 'name');
    res.json(transaction);
  },

  remove: async (req, res) => {
    const transaction = await context.transactions.delete(req.params.id);
    res.json(transaction);
  },
};
