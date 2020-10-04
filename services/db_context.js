const {
  Payment,
  Student,
  Classroom,
  SchoolYear,
  Registration,
  User,
  FeeType,
  Role,
  Subject,
  Teacher,
  Permission,
  Transaction,
  TransactionType
} = require('../models');
const DbSet = require('./db_set');

module.exports = {
  payments: new DbSet(Payment),
  students: new DbSet(Student),
  classrooms: new DbSet(Classroom),
  schoolYears: new DbSet(SchoolYear),
  registrations: new DbSet(Registration),
  users: new DbSet(User),
  fees: new DbSet(FeeType),
  roles: new DbSet(Role),
  subjects: new DbSet(Subject),
  teachers: new DbSet(Teacher),
  permissions: new DbSet(Permission),
  transactions: new DbSet(Transaction),
  transactionTypes: new DbSet(TransactionType)
};
