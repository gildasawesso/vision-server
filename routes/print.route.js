const router = require('express-promise-router')();

const printController = require('../controllers/print.controller');

router.post('/multiple', printController.multiple);
router.post('/excel', printController.exportExcel);
router.post('/:templateName', printController.print);

module.exports = router;
