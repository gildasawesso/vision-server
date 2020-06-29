var teacherModel = require('../models/teacher.js');

/**
 * teacherController.js
 *
 * @description :: Server-side logic for managing teachers.
 */
module.exports = {

    /**
     * teacherController.list()
     */
    list: function (req, res) {
        teacherModel.find(function (err, teachers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting teacher.',
                    error: err
                });
            }
            return res.json(teachers);
        });
    },

    /**
     * teacherController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        teacherModel.findOne({_id: id}, function (err, teacher) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting teacher.',
                    error: err
                });
            }
            if (!teacher) {
                return res.status(404).json({
                    message: 'No such teacher'
                });
            }
            return res.json(teacher);
        });
    },

    /**
     * teacherController.create()
     */
    create: function (req, res) {
        var teacher = new teacherModel({
			firstname : req.body.firstname,
			lastname : req.body.lastname,
			gender : req.body.gender,
			address : req.body.address,
			phone : req.body.phone,
			qualifications : req.body.qualifications,
			hireDate : req.body.hireDate,
			fireDate : req.body.fireDate

        });

        teacher.save(function (err, teacher) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating teacher',
                    error: err
                });
            }
            return res.status(201).json(teacher);
        });
    },

    /**
     * teacherController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        teacherModel.findOne({_id: id}, function (err, teacher) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting teacher',
                    error: err
                });
            }
            if (!teacher) {
                return res.status(404).json({
                    message: 'No such teacher'
                });
            }

            teacher.firstname = req.body.firstname ? req.body.firstname : teacher.firstname;
			teacher.lastname = req.body.lastname ? req.body.lastname : teacher.lastname;
			teacher.gender = req.body.gender ? req.body.gender : teacher.gender;
			teacher.address = req.body.address ? req.body.address : teacher.address;
			teacher.phone = req.body.phone ? req.body.phone : teacher.phone;
			teacher.qualifications = req.body.qualifications ? req.body.qualifications : teacher.qualifications;
			teacher.hireDate = req.body.hireDate ? req.body.hireDate : teacher.hireDate;
			teacher.fireDate = req.body.fireDate ? req.body.fireDate : teacher.fireDate;

            teacher.save(function (err, teacher) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating teacher.',
                        error: err
                    });
                }

                return res.json(teacher);
            });
        });
    },

    /**
     * teacherController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        teacherModel.findByIdAndRemove(id, function (err, teacher) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the teacher.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
