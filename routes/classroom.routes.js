const router = require('express-promise-router')();
const restifyMongoose = require('restify-mongoose');

const classroomController = require('../controllers/classroomController');
const { Classroom } = require('../models');

const Classrooms = restifyMongoose(Classroom);

router.get('/students', classroomController.getAllStudents);
router.get('/:classroomId/students', classroomController.getStudents);
router.get('/', Classrooms.query());
router.get('/:id', Classrooms.detail());

router.post('/', Classrooms.insert());
router.put('/:id', Classrooms.update());
router.delete('/:id', Classrooms.remove());

module.exports = router;
