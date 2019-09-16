const router = require('express-promise-router')();

const schoolController = require('../controllers/school.controller.js');

router.get('/', schoolController.list);
router.get('/:id', schoolController.show);
router.post('/', schoolController.create);
router.put('/:id', schoolController.update);
router.delete('/:id', schoolController.remove);

module.exports = router;
