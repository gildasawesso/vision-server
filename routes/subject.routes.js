const router = require('express-promise-router')();

const subjectController = require('../controllers/subject.controller');

router.get('/', subjectController.all);
router.get('/:id', subjectController.one);

router.post('/', subjectController.add);

router.patch('/:id', subjectController.update);

router.delete('/:id', subjectController.delete);

module.exports = router;
