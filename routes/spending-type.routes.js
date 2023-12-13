const router = require('express-promise-router')();

const spendingTypeController = require('../controllers/spending-type.controller');

router.get('/', spendingTypeController.list);
router.post('/', spendingTypeController.create);
router.patch('/:id', spendingTypeController.update);
router.delete('/:id', spendingTypeController.remove);

module.exports = router;
