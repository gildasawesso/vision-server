const router = require('express-promise-router')();

const printController = require('../controllers/print.controller');

router.post('/multiple', printController.multiple);
router.post('/:templateName', printController.print);

module.exports = router;
