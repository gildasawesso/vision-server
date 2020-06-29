var express = require('express');
var router = express.Router();
var teacherController = require('../controllers/teacherController.js');

/*
 * GET
 */
router.get('/', teacherController.list);

/*
 * GET
 */
router.get('/:id', teacherController.show);

/*
 * POST
 */
router.post('/', teacherController.create);

/*
 * PUT
 */
router.put('/:id', teacherController.update);

/*
 * DELETE
 */
router.delete('/:id', teacherController.remove);

module.exports = router;
