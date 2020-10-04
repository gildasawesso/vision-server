const router = require('express-promise-router')();

const statsController = require('../controllers/stats.controller');

router.get('/genders', statsController.genders);
router.get('/pastandnewstudents', statsController.pastAndNewStudents);
router.get('/payments', statsController.schoolPayments);
router.get('/classrooms/effectif', statsController.classroomEffectif);
router.get('/classrooms/effectif/genre', statsController.classroomEffectifByGenre);

module.exports = router;
