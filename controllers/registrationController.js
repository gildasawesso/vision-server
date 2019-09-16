var registrationModel = require('../models/registration.js');

/**
 * registrationController.js
 *
 * @description :: Server-side logic for managing registrations.
 */
module.exports = {

    /**
     * registrationController.list()
     */
    list: function (req, res) {
        registrationModel.find(function (err, registrations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting registration.',
                    error: err
                });
            }
            return res.json(registrations);
        });
    },

    /**
     * registrationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        registrationModel.findOne({_id: id}, function (err, registration) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting registration.',
                    error: err
                });
            }
            if (!registration) {
                return res.status(404).json({
                    message: 'No such registration'
                });
            }
            return res.json(registration);
        });
    },

    /**
     * registrationController.create()
     */
    create: function (req, res) {
        var registration = new registrationModel({
			student : req.body.student,
			class : req.body.class,
			schoolYear : req.body.schoolYear

        });

        registration.save(function (err, registration) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating registration',
                    error: err
                });
            }
            return res.status(201).json(registration);
        });
    },

    /**
     * registrationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        registrationModel.findOne({_id: id}, function (err, registration) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting registration',
                    error: err
                });
            }
            if (!registration) {
                return res.status(404).json({
                    message: 'No such registration'
                });
            }

            registration.student = req.body.student ? req.body.student : registration.student;
			registration.class = req.body.class ? req.body.class : registration.class;
			registration.schoolYear = req.body.schoolYear ? req.body.schoolYear : registration.schoolYear;

            registration.save(function (err, registration) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating registration.',
                        error: err
                    });
                }

                return res.json(registration);
            });
        });
    },

    /**
     * registrationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        registrationModel.findByIdAndRemove(id, function (err, registration) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the registration.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
