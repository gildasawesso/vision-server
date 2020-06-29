// const router = require('express-promise-router')();
const restifyMongoose = require('restify-mongoose');

var express = require('express');
var router = express.Router();

const { Resource } = require('../models');

const resources = restifyMongoose(Resource);

router.get('/', resources.query());
router.get('/:id', resources.detail());
router.post('/', resources.insert());
router.put('/:id', resources.update());
router.delete('/:id', resources.remove());

module.exports = router;
