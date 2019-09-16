var studentModel = require('../models/student.js');

/**
 * studentController.js
 *
 * @description :: Server-side logic for managing students.
 */
module.exports = {

    /**
     * studentController.list()
     */
    list: function (req, res) {
        studentModel.find(function (err, students) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }
            return res.json(students);
        });
    },

    /**
     * studentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({_id: id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }
            return res.json(student);
        });
    },

    /**
     * studentController.create()
     */
    create: function (req, res) {
        var student = new studentModel({
			firstname : req.body.firstname,
			lastname : req.body.lastname,
			birthday : req.body.birthday,
			matricule : req.body.matricule,
			gender : req.body.gender,
			status : req.body.status,
			birthCity : req.body.birthCity,
			fathersFirstname : req.body.fathersFirstname,
			fathersLastname : req.body.fathersLastname,
			mothersFirstname : req.body.mothersFirstname,
			mothersLastname : req.body.mothersLastname,
			fathersJob : req.body.fathersJob,
			mothersJob : req.body.mothersJob,
			fathersPhone : req.body.fathersPhone,
			mothersPhone : req.body.mothersPhone,
			address : req.body.address

        });

        student.save(function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating student',
                    error: err
                });
            }
            return res.status(201).json(student);
        });
    },

    /**
     * studentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({_id: id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }

            student.firstname = req.body.firstname ? req.body.firstname : student.firstname;
			student.lastname = req.body.lastname ? req.body.lastname : student.lastname;
			student.birthday = req.body.birthday ? req.body.birthday : student.birthday;
			student.matricule = req.body.matricule ? req.body.matricule : student.matricule;
			student.gender = req.body.gender ? req.body.gender : student.gender;
			student.status = req.body.status ? req.body.status : student.status;
			student.birthCity = req.body.birthCity ? req.body.birthCity : student.birthCity;
			student.fathersFirstname = req.body.fathersFirstname ? req.body.fathersFirstname : student.fathersFirstname;
			student.fathersLastname = req.body.fathersLastname ? req.body.fathersLastname : student.fathersLastname;
			student.mothersFirstname = req.body.mothersFirstname ? req.body.mothersFirstname : student.mothersFirstname;
			student.mothersLastname = req.body.mothersLastname ? req.body.mothersLastname : student.mothersLastname;
			student.fathersJob = req.body.fathersJob ? req.body.fathersJob : student.fathersJob;
			student.mothersJob = req.body.mothersJob ? req.body.mothersJob : student.mothersJob;
			student.fathersPhone = req.body.fathersPhone ? req.body.fathersPhone : student.fathersPhone;
			student.mothersPhone = req.body.mothersPhone ? req.body.mothersPhone : student.mothersPhone;
			student.address = req.body.address ? req.body.address : student.address;

            student.save(function (err, student) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating student.',
                        error: err
                    });
                }

                return res.json(student);
            });
        });
    },

    /**
     * studentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        studentModel.findByIdAndRemove(id, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the student.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
