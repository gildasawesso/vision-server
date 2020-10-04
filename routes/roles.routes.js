const router = require('express-promise-router')();

const roleController = require('../controllers/role.controller');

router.get('/', roleController.all);

module.exports = router;
