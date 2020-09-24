const {
  Payment,
  Student,
  Classroom,
  SchoolYear,
  Registration,
  User,
  FeeType
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
};
