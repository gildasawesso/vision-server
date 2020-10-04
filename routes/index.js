const router = require('express-promise-router')();
const { NotFound } = require('http-errors');
const { auth } = require('../middlewares/jwt.middleware');
const schoolYearsRouter = require('./school-year.routes');
const printRouter = require('./print.route');
const authRouter = require('./auth.routes');
const usersRouter = require('./user.routes');
const studentRouter = require('./student.routes');
const registrationRouter = require('./registration.routes');
const examinationRouter = require('./examinationRoutes');
const spendingTypesRouter = require('./spending-type.routes');
const classroomRouter = require('./classroom.routes');
const bulletinRouter = require('./bulletin.routes');
const paymentRouter = require('./payment.routes');
const configRouter = require('./config.routes');
const feeRouter = require('./fee.routes');
const statsRouter = require('./stats.routes');
const roleRouter = require('./roles.routes');
const teacherRouter = require('./teacher.routes');
const subjectRouter = require('./subject.routes');
const schoolRouter = require('./school.routes');
const permissionRouter = require('./permission.routes');
const transactionRouter = require('./transaction.routes');
const transactionTypesRouter = require('./transaction-types.routes');

router.get('/', (req, res) => res.json(Date.now()));
router.use('/auth', authRouter);
router.use('/config', auth.optional, configRouter);

router.use('/schools', auth.required, schoolRouter);
router.use('/permissions', auth.required, permissionRouter);
router.use('/subjects', auth.required, subjectRouter);
router.use('/roles', auth.required, roleRouter);
router.use('/teachers', auth.required, teacherRouter);
router.use('/examinations', auth.required, examinationRouter);
router.use('/registrations', auth.required, registrationRouter);
router.use('/students', auth.required, studentRouter);
router.use('/users', auth.required, usersRouter);
router.use('/schoolyears', auth.required, schoolYearsRouter);
router.use('/report/print', auth.required, printRouter);
router.use('/spending/types', auth.required, spendingTypesRouter);
router.use('/classrooms', auth.required, classroomRouter);
router.use('/bulletins', auth.required, bulletinRouter);
router.use('/payments', auth.required, paymentRouter);
router.use('/fees', auth.required, feeRouter);
router.use('/stats', auth.required, statsRouter);
router.use('/transactions', auth.required, transactionRouter);
router.use('/transactions/types', auth.required, transactionTypesRouter);

router.use((req, res, next) => {
  next(new NotFound(`The requested route '${req.method} ${req.url}' does not exist.`));
});

module.exports = router;
