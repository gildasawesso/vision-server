const router = require('express-promise-router')();

const { validateRegistration, validateAuthentication } = require('../middlewares/validators');
const authController = require('../controllers/auth');

router.post('/signup', validateRegistration, authController.register);
router.post('/signin', validateAuthentication, authController.signin);
router.post('/token', authController.renew);
router.post('/admin/token', authController.adminRenew);
router.post('/admin/signin', authController.adminSignin);
router.post('/admin/signup', authController.adminRegister);

module.exports = router;
