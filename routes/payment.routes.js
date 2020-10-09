const router = require('express-promise-router')();

const paymentController = require('../controllers/payment.controller');

router.get('/', paymentController.get);
router.get('/integration', paymentController.integration);
router.get('/student/:id/fee/:feeId/remaining', paymentController.feeRemainingPayment);
router.get('/student/:id/fee/:feeId', paymentController.feePayments);
router.get('/student/:id', paymentController.student);
router.get('/classrooms', paymentController.classrooms);
router.get('/classrooms/state', paymentController.state);
router.get('/:id', paymentController.one);

router.patch('/:id', paymentController.update);

router.post('/', paymentController.add);

router.delete('/:id', paymentController.delete);

module.exports = router;
