const router = require('express-promise-router')();

const userController = require('../controllers/user.controller.js');

router.get('/permissions', userController.permissions);
router.get('/count', userController.count);
router.get('/me', userController.me);
router.post('/', userController.add);

module.exports = router;
