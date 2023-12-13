var schoolSessionModel = require('../models/school-session.model.js');

/**
 * school-session.controller.js
 *
 * @description :: Server-side logic for managing schoolSessions.
 */
module.exports = {

    /**
     * schoolSessionController.list()
     */
    list: function (req, res) {
        schoolSessionModel.find(function (err, schoolSessions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting schoolSession.',
                    error: err
                });
            }
            return res.json(schoolSessions);
        });
    },

    /**
     * schoolSessionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        schoolSessionModel.findOne({_id: id}, function (err, schoolSession) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting schoolSession.',
                    error: err
                });
            }
            if (!schoolSession) {
                return res.status(404).json({
                    message: 'No such schoolSession'
                });
            }
            return res.json(schoolSession);
        });
    },

    /**
     * schoolSessionController.create()
     */
    create: function (req, res) {
        var schoolSession = new schoolSessionModel({
			name : req.body.name,
			startDate : req.body.startDate,
			endDate : req.body.endDate,
			schoolYear : req.body.schoolYear

        });

        schoolSession.save(function (err, schoolSession) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating schoolSession',
                    error: err
                });
            }
            return res.status(201).json(schoolSession);
        });
    },

    /**
     * schoolSessionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        schoolSessionModel.findOne({_id: id}, function (err, schoolSession) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting schoolSession',
                    error: err
                });
            }
            if (!schoolSession) {
                return res.status(404).json({
                    message: 'No such schoolSession'
                });
            }

            schoolSession.name = req.body.name ? req.body.name : schoolSession.name;
			schoolSession.startDate = req.body.startDate ? req.body.startDate : schoolSession.startDate;
			schoolSession.endDate = req.body.endDate ? req.body.endDate : schoolSession.endDate;
			schoolSession.schoolYear = req.body.schoolYear ? req.body.schoolYear : schoolSession.schoolYear;

            schoolSession.save(function (err, schoolSession) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating schoolSession.',
                        error: err
                    });
                }

                return res.json(schoolSession);
            });
        });
    },

    /**
     * schoolSessionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        schoolSessionModel.findByIdAndRemove(id, function (err, schoolSession) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the schoolSession.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
