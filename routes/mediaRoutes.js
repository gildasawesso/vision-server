var express = require('express');
var router = express.Router();
var mediaController = require('../controllers/mediaController.js');

/*
 * GET
 */
router.get('/', mediaController.list);

/*
 * GET
 */
router.get('/:id', mediaController.show);

/*
 * POST
 */
router.post('/', mediaController.create);

/*
 * PUT
 */
router.put('/:id', mediaController.update);

/*
 * DELETE
 */
router.delete('/:id', mediaController.remove);

module.exports = router;
