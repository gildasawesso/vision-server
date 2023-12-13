const router = require('express-promise-router')();

const roleController = require('../controllers/role.controller');

router.get('/', roleController.all);
router.get('/:id', roleController.one);
router.post('/', roleController.add);
router.patch('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
