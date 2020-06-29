var contributionModel = require('../models/payment.js');

/**
 * contributionController.js
 *
 * @description :: Server-side logic for managing contributions.
 */
module.exports = {

    /**
     * contributionController.list()
     */
    list: function (req, res) {
        contributionModel.find(function (err, contributions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contribution.',
                    error: err
                });
            }
            return res.json(contributions);
        });
    },

    /**
     * contributionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        contributionModel.findOne({_id: id}, function (err, contribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contribution.',
                    error: err
                });
            }
            if (!contribution) {
                return res.status(404).json({
                    message: 'No such contribution'
                });
            }
            return res.json(contribution);
        });
    },

    /**
     * contributionController.create()
     */
    create: function (req, res) {
        var contribution = new contributionModel({
			student : req.body.student,
			schoolyear : req.body.schoolyear,
			fee : req.body.fee

        });

        contribution.save(function (err, contribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating contribution',
                    error: err
                });
            }
            return res.status(201).json(contribution);
        });
    },

    /**
     * contributionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        contributionModel.findOne({_id: id}, function (err, contribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contribution',
                    error: err
                });
            }
            if (!contribution) {
                return res.status(404).json({
                    message: 'No such contribution'
                });
            }

            contribution.student = req.body.student ? req.body.student : contribution.student;
			contribution.schoolyear = req.body.schoolyear ? req.body.schoolyear : contribution.schoolyear;
			contribution.fee = req.body.fee ? req.body.fee : contribution.fee;

            contribution.save(function (err, contribution) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contribution.',
                        error: err
                    });
                }

                return res.json(contribution);
            });
        });
    },

    /**
     * contributionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        contributionModel.findByIdAndRemove(id, function (err, contribution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the contribution.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
