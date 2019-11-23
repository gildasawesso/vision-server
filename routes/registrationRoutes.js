const router = require('express-promise-router')();

const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.all);
router.patch('/:id', registrationController.update);
router.post('/', registrationController.add);

module.exports = router;
