// const router = require('express-promise-router')();
const restifyMongoose = require('restify-mongoose');

let express = require('express');
let router = express.Router();

const testController = require('../controllers/test.controller');

router.post('/existing', testController.arrangeStudents);

module.exports = router;
