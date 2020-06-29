const router = require('express-promise-router')();

const schoolSessionController = require('../controllers/school-session.controller.js');

router.get('/', schoolSessionController.list);
router.get('/:id', schoolSessionController.show);
router.post('/', schoolSessionController.create);
router.put('/:id', schoolSessionController.update);
router.delete('/:id', schoolSessionController.remove);

module.exports = router;
