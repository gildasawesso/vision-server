const router = require('express-promise-router')();

const permissionController = require('../controllers/permission.controller');

router.get('/', permissionController.all);

module.exports = router;
