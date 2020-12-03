const router = require('express-promise-router')();

const userController = require('../controllers/user.controller.js');

router.get('/', userController.all);
router.get('/permissions', userController.permissions);
router.get('/count', userController.count);
router.get('/me', userController.me);
router.patch('/:id', userController.update);
router.post('/', userController.add);

module.exports = router;
