var express = require('express');
var router = express.Router();
var registrationController = require('../controllers/registrationController.js');

/*
 * GET
 */
router.get('/', registrationController.list);

/*
 * GET
 */
router.get('/:id', registrationController.show);

/*
 * POST
 */
router.post('/', registrationController.create);

/*
 * PUT
 */
router.put('/:id', registrationController.update);

/*
 * DELETE
 */
router.delete('/:id', registrationController.remove);

module.exports = router;
