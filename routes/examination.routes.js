const router = require('express-promise-router')();

const examinationController = require('../controllers/examinationController');

router.get('/', examinationController.get);
router.get('/:id', examinationController.one);

router.post('/', examinationController.add);

router.put('/:id', examinationController.update);

router.patch('/:id/marks', examinationController.updateStudents);
router.patch('/:id', examinationController.update);

router.delete('/:id', examinationController.delete);

module.exports = router;
