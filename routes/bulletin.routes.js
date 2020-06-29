const router = require('express-promise-router')();
const restifyMongoose = require('restify-mongoose');

const bulletinController = require('../controllers/bulletinController');
const { Classroom } = require('../models');

const Classrooms = restifyMongoose(Classroom);

router.get('/', bulletinController.classroomBulletin);

module.exports = router;
