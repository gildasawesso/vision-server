const router = require('express-promise-router')();

const schoolYearController = require('../controllers/school-year.controller.js');

router.get('/', schoolYearController.list);
router.get('/current', schoolYearController.current);
router.get('/:id', schoolYearController.show);
router.post('/:id/sessions', schoolYearController.addSession);
router.get('/sessions/current', schoolYearController.currentSession);
router.delete('/:id/sessions/:sessionId', schoolYearController.removeSession);
router.post('/', schoolYearController.create);
router.put('/:id', schoolYearController.update);
router.patch('/:id', schoolYearController.update);
router.delete('/:id', schoolYearController.remove);

module.exports = router;
