const router = require('express-promise-router')();

const teacherController = require('../controllers/teacher.controller');

router.get('/', teacherController.all);

module.exports = router;
