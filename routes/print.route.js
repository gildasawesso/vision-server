const router = require('express-promise-router')();

const printController = require('../controllers/print.controller');

router.post('/:templateName', printController.print);

module.exports = router;
