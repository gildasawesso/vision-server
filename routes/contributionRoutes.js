var express = require('express');
var router = express.Router();
var contributionController = require('../controllers/contributionController.js');

/*
 * GET
 */
router.get('/', contributionController.list);

/*
 * GET
 */
router.get('/:id', contributionController.show);

/*
 * POST
 */
router.post('/', contributionController.create);

/*
 * PUT
 */
router.put('/:id', contributionController.update);

/*
 * DELETE
 */
router.delete('/:id', contributionController.remove);

module.exports = router;
