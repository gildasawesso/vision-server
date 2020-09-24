const router = require('express-promise-router')();
const { NotFound } = require('http-errors');
const restify = require('express-restify-mongoose');

const { PermissionResource } = require('../models');
const { Classroom } = require('../models');
const { Teacher } = require('../models');
const { Subject } = require('../models');
const { FeeCategory } = require('../models');
const { FeeType } = require('../models');
const { Student } = require('../models');
const { Registration } = require('../models');
const { Payment } = require('../models');
const { Discount } = require('../models');
const { School } = require('../models');
const { User } = require('../models');
const { Role } = require('../models');
const { Permission } = require('../models');
const { auth } = require('../middlewares/jwt.middleware');
const schoolyearMiddleware = require('../middlewares/school.middleware');
// const schoolRouter = require('./school.routes');
const schoolYearsRouter = require('./school-year.routes');
const printRouter = require('./print.route');
const authRouter = require('./auth.routes');
const usersRouter = require('./user.routes');
const studentRouter = require('./studentRoutes');
const registrationRouter = require('./registration.routes');
const examinationRouter = require('./examinationRoutes');
const spendingTypesRouter = require('./spending-type.routes');
const classroomRouter = require('./classroom.routes');
const bulletinRouter = require('./bulletin.routes');
const paymentRouter = require('./payment.routes');
const configRouter = require('./config.routes');
// const resourcesRouter = require('./resource.routes');

router.get('/', (req, res) => res.json(Date.now()));
router.use('/auth', authRouter);
restify.serve(router, PermissionResource, { name: 'app/resources', prefix: '', version: '' });
restify.serve(router, Classroom, { name: 'r/classrooms', prefix: '', version: '' });
restify.serve(router, FeeCategory, { name: 'fees/categories', prefix: '', version: '' });
restify.serve(router, FeeType, { name: 'fees/types', prefix: '', version: '' });
restify.serve(router, Discount, { name: 'discounts', prefix: '', version: '' });
restify.serve(router, Teacher, { name: 'teachers', prefix: '', version: '' });
restify.serve(router, Subject, { name: 'subjects', prefix: '', version: '' });
restify.serve(router, School, { name: 'schools', prefix: '', version: '' });
restify.serve(router, Role, { name: 'roles', prefix: '', version: '' });
restify.serve(router, Permission, { name: 'permissions', prefix: '', version: '' });
restify.serve(router, User, { name: 'r/users', prefix: '', version: '' });

router.use('/examinations', auth.optional, examinationRouter);
router.use('/registrations', auth.optional, registrationRouter);
router.use('/students', auth.optional, studentRouter);
router.use('/users', auth.required, usersRouter);
router.use('/schoolyears', auth.required, schoolYearsRouter);
router.use('/report/print', auth.optional, printRouter);
router.use('/spending/types', auth.required, spendingTypesRouter);
router.use('/classrooms', auth.required, classroomRouter);
router.use('/bulletins', auth.required, bulletinRouter);
router.use('/payments', auth.optional, paymentRouter);
router.use('/config', auth.optional, configRouter);

router.use((req, res, next) => {
  next(new NotFound(`The requested route '${req.method} ${req.url}' does not exist.`));
});

module.exports = router;
