const router = require('express-promise-router')();
const restifyMongoose = require('restify-mongoose');

const { Permission } = require('../models');

const permissions = restifyMongoose(Permission);

router.get('/', permissions.query());
router.get('/:id', permissions.detail());
router.post('/', permissions.insert());
router.put('/:id', permissions.update());
router.delete('/:id', permissions.remove());

module.exports = router;
