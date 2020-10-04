const router = require('express-promise-router')();

const transactionTypesController = require('../controllers/transaction-type.controller');

router.get('/', transactionTypesController.all);
router.get('/expense', transactionTypesController.expense);
router.get('/income', transactionTypesController.income);

router.post('/', transactionTypesController.add);

router.patch('/:id', transactionTypesController.update);

router.delete('/:id', transactionTypesController.delete);

module.exports = router;
