var express = require('express');
var router = express.Router();
var subjectController = require('../controllers/subjectController.js');

/*
 * GET
 */
router.get('/', subjectController.list);

/*
 * GET
 */
router.get('/:id', subjectController.show);

/*
 * POST
 */
router.post('/', subjectController.create);

/*
 * PUT
 */
router.put('/:id', subjectController.update);

/*
 * DELETE
 */
router.delete('/:id', subjectController.remove);

module.exports = router;
