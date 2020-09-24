const router = require('express-promise-router')();
const schoolyearMiddleware = require('../middlewares/school.middleware');
const { auth } = require('../middlewares/jwt.middleware');

const configController = require('../controllers/config.controller');

router.get('/admin/exist', configController.isAdminExist);
router.get('/schoolyear/exist', auth.required, configController.isSchoolYearExist);

module.exports = router;
