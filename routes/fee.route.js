const express = require('express');

const router = express.Router();
const feeController = require('../controllers/feeController.js');

router.get('/', feeController.list);
router.get('/:id', feeController.show);
router.post('/', feeController.create);
router.put('/:id', feeController.update);
router.delete('/:id', feeController.remove);

module.exports = router;
