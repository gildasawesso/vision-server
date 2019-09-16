var subjectModel = require('../models/subject.js');

/**
 * subjectController.js
 *
 * @description :: Server-side logic for managing subjects.
 */
module.exports = {

    /**
     * subjectController.list()
     */
    list: function (req, res) {
        subjectModel.find(function (err, subjects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subject.',
                    error: err
                });
            }
            return res.json(subjects);
        });
    },

    /**
     * subjectController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        subjectModel.findOne({_id: id}, function (err, subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subject.',
                    error: err
                });
            }
            if (!subject) {
                return res.status(404).json({
                    message: 'No such subject'
                });
            }
            return res.json(subject);
        });
    },

    /**
     * subjectController.create()
     */
    create: function (req, res) {
        var subject = new subjectModel({
			code : req.body.code,
			name : req.body.name,
			professors : req.body.professors

        });

        subject.save(function (err, subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating subject',
                    error: err
                });
            }
            return res.status(201).json(subject);
        });
    },

    /**
     * subjectController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        subjectModel.findOne({_id: id}, function (err, subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting subject',
                    error: err
                });
            }
            if (!subject) {
                return res.status(404).json({
                    message: 'No such subject'
                });
            }

            subject.code = req.body.code ? req.body.code : subject.code;
			subject.name = req.body.name ? req.body.name : subject.name;
			subject.professors = req.body.professors ? req.body.professors : subject.professors;

            subject.save(function (err, subject) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating subject.',
                        error: err
                    });
                }

                return res.json(subject);
            });
        });
    },

    /**
     * subjectController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        subjectModel.findByIdAndRemove(id, function (err, subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the subject.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
