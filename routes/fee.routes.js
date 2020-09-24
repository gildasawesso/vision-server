const express = require('express');

const router = express.Router();
const feeController = require('../controllers/fee.controller');

router.get('/', feeController.all);
router.get('/:id', feeController.one);
router.post('/', feeController.add);
router.put('/:id', feeController.update);
router.delete('/:id', feeController.remove);

module.exports = router;
