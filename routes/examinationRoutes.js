const router = require('express-promise-router')();

const examinationController = require('../controllers/examinationController');

router.get('/', examinationController.get);
router.post('/', examinationController.add);
router.put('/:id', examinationController.update);
router.patch('/:id/marks', examinationController.updateStudents);
router.patch('/:id', examinationController.update);
router.delete('/:id', examinationController.delete);
router.get('/types', examinationController.getTypes);
router.post('/types', examinationController.addType);
router.put('/types/:id', examinationController.updateType);
router.delete('/types/:id', examinationController.deleteType);

module.exports = router;
