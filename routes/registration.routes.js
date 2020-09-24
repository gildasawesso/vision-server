const router = require('express-promise-router')();

const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.all);
router.get('/student/:id/reductions', registrationController.reductions);
router.get('/lastyear', registrationController.lastYear);
router.get('/:id', registrationController.one);
router.patch('/:id', registrationController.update);
router.post('/', registrationController.add);
router.delete('/:id', registrationController.delete);

module.exports = router;
