const router = require('express-promise-router')();
const feeController = require('../controllers/fee.controller');

router.get('/', feeController.all);
router.get('/others', feeController.otherFees);
router.get('/:id', feeController.one);
router.post('/', feeController.add);
router.patch('/:id', feeController.update);
router.delete('/:id', feeController.remove);

module.exports = router;
