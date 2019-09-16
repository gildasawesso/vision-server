const router = require('express-promise-router')();

const schoolYearController = require('../controllers/school-year.controller.js');

router.get('/', schoolYearController.list);
router.get('/:id', schoolYearController.show);
router.post('/:id/sessions', schoolYearController.addSession);
router.delete('/:id/sessions/:sessionId', schoolYearController.removeSession);
router.post('/', schoolYearController.create);
router.put('/:id', schoolYearController.update);
router.delete('/:id', schoolYearController.remove);

module.exports = router;
