const router = require('express-promise-router')();

const registrationController = require('../controllers/registrationController');

router.get('/', registrationController.all);
router.post('/', registrationController.add);

module.exports = router;
