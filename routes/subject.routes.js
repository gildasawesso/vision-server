const router = require('express-promise-router')();

const subjectController = require('../controllers/subject.controller');

router.get('/', subjectController.all);

module.exports = router;
