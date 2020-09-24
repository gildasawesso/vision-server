const router = require('express-promise-router')();

const paymentController = require('../controllers/payment.controller');

router.get('/', paymentController.get);
router.get('/student/:id', paymentController.student);
router.get('/classrooms', paymentController.classrooms);

router.patch('/:id', paymentController.update);

router.post('/', paymentController.add);

router.delete('/:id', paymentController.delete);

module.exports = router;
