const router = require('express-promise-router')();

const examinationTypeController = require('../controllers/examination-type.controller');

router.get('/', examinationTypeController.get);
router.get('/:id', examinationTypeController.one);
router.post('/', examinationTypeController.add);
router.patch('/:id', examinationTypeController.update);
router.delete('/:id', examinationTypeController.delete);

module.exports = router;
