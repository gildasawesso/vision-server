const router = require('express-promise-router')();
const { NotFound } = require('http-errors');
const restify = require('express-restify-mongoose');

const { PermissionResource } = require('../models');
const { Classroom } = require('../models');
const { Teacher } = require('../models');
const { Subject } = require('../models');
const { FeeType } = require('../models');
const { Fee } = require('../models');
const { Student } = require('../models');
const { Registration } = require('../models');
const { Payment } = require('../models');
const { Discount } = require('../models');
const { auth } = require('../middlewares/jwt.middleware');
const schoolRouter = require('./school.routes');
const schoolYearsRouter = require('./school-year.routes');
const schoolYearsSessionsRouter = require('./school-session.routes');
// const resourcesRouter = require('./resource.routes');

router.get('/', (req, res) => res.json(Date.now()));
// router.get('/docs', (req, res) => res.redirect('/docs'));
// router.use('/auth', authRouter);
// router.use('/users', auth.required, userRouter);
// router.use('/collaborations', auth.required, collaborationRouter);
restify.serve(router, PermissionResource, { name: 'app/resources', prefix: '', version: '' });
restify.serve(router, Classroom, { name: 'classrooms', prefix: '', version: '' });
restify.serve(router, FeeType, { name: 'fees/types', prefix: '', version: '' });
restify.serve(router, Fee, { name: 'fees', prefix: '', version: '' });
restify.serve(router, Registration, { name: 'registrations', prefix: '', version: '' });
restify.serve(router, Payment, { name: 'payments', prefix: '', version: '' });
restify.serve(router, Discount, { name: 'discounts', prefix: '', version: '' });
restify.serve(router, Teacher, { name: 'teachers', prefix: '', version: '' });
restify.serve(router, Subject, { name: 'subjects', prefix: '', version: '' });
restify.serve(router, Student, { name: 'students', prefix: '', version: '' });
router.use('/schools', auth.optional, schoolRouter);
router.use('/schoolyears', auth.optional, schoolYearsRouter);
router.use('/schoolyears/sessions', auth.optional, schoolYearsSessionsRouter);

router.use((req, res, next) => {
  next(new NotFound(`The requested route '${req.method} ${req.url}' does not exist.`));
});

module.exports = router;
