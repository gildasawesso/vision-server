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
// const schoolRouter = require('./school.routes');
const schoolYearsRouter = require('./school-year.routes');
const printRouter = require('./print.route');
const authRouter = require('./auth.routes');
const usersRouter = require('./user.routes');
const studentRouter = require('./studentRoutes');
// const resourcesRouter = require('./resource.routes');

router.get('/', (req, res) => res.json(Date.now()));
// router.get('/docs', (req, res) => res.redirect('/docs'));
router.use('/auth', authRouter);
// router.use('/users', auth.required, userRouter);
// router.use('/collaborations', auth.required, collaborationRouter);
restify.serve(router, PermissionResource, { name: 'app/resources', prefix: '', version: '' });
restify.serve(router, Classroom, { name: 'classrooms', prefix: '', version: '' });
restify.serve(router, FeeCategory, { name: 'fees/categories', prefix: '', version: '' });
restify.serve(router, FeeType, { name: 'fees/types', prefix: '', version: '' });
restify.serve(router, Registration, { name: 'registrations', prefix: '', version: '' });
restify.serve(router, Payment, { name: 'payments', prefix: '', version: '' });
restify.serve(router, Discount, { name: 'discounts', prefix: '', version: '' });
restify.serve(router, Teacher, { name: 'teachers', prefix: '', version: '' });
restify.serve(router, Subject, { name: 'subjects', prefix: '', version: '' });
restify.serve(router, School, { name: 'schools', prefix: '', version: '' });
restify.serve(router, Role, { name: 'roles', prefix: '', version: '' });
restify.serve(router, Permission, { name: 'permissions', prefix: '', version: '' });
restify.serve(router, User, { name: 'r/users', prefix: '', version: '' });
router.use('/students', auth.optional, studentRouter);
router.use('/users', auth.required, usersRouter);
router.use('/schoolyears', auth.required, schoolYearsRouter);
router.use('/report/print', auth.optional, printRouter);

router.use((req, res, next) => {
  next(new NotFound(`The requested route '${req.method} ${req.url}' does not exist.`));
});

module.exports = router;
