const router = require('express-promise-router')();

const teacherController = require('../controllers/teacher.controller');

router.get('/', teacherController.all);
router.post('/', teacherController.add);
router.delete('/:teacherId', teacherController.remove);
router.patch('/:teacherId', teacherController.update);

module.exports = router;
