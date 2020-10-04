const router = require('express-promise-router')();

const transactionController = require('../controllers/transaction.controller');

router.get('/', transactionController.all);
router.get('/balance', transactionController.balance);

router.post('/', transactionController.add);

router.delete('/:id', transactionController.remove);

module.exports = router;
