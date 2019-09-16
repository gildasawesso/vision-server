var express = require('express');
var router = express.Router();
var discountController = require('../controllers/discountController.js');

/*
 * GET
 */
router.get('/', discountController.list);

/*
 * GET
 */
router.get('/:id', discountController.show);

/*
 * POST
 */
router.post('/', discountController.create);

/*
 * PUT
 */
router.put('/:id', discountController.update);

/*
 * DELETE
 */
router.delete('/:id', discountController.remove);

module.exports = router;
