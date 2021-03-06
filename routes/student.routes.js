const router = require('express-promise-router')();

const studentController = require('../controllers/studentController');

router.get('/', studentController.get);
router.get('/:id', studentController.one);
router.post('/', studentController.add);
router.patch('/:id', studentController.update);
router.delete('/:id', studentController.delete);

module.exports = router;
