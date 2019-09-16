var classModel = require('../models/classroom.js');

/**
 * classController.js
 *
 * @description :: Server-side logic for managing classs.
 */
module.exports = {

    /**
     * classController.list()
     */
    list: function (req, res) {
        classModel.find(function (err, classs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class.',
                    error: err
                });
            }
            return res.json(classs);
        });
    },

    /**
     * classController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        classModel.findOne({_id: id}, function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class.',
                    error: err
                });
            }
            if (!class) {
                return res.status(404).json({
                    message: 'No such class'
                });
            }
            return res.json(class);
        });
    },

    /**
     * classController.create()
     */
    create: function (req, res) {
        var class = new classModel({
			name : req.body.name,
			capacity : req.body.capacity,
			teacher : req.body.teacher,
			fee : req.body.fee,
			subjects : req.body.subjects

        });

        class.save(function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating class',
                    error: err
                });
            }
            return res.status(201).json(class);
        });
    },

    /**
     * classController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        classModel.findOne({_id: id}, function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting class',
                    error: err
                });
            }
            if (!class) {
                return res.status(404).json({
                    message: 'No such class'
                });
            }

            class.name = req.body.name ? req.body.name : class.name;
			class.capacity = req.body.capacity ? req.body.capacity : class.capacity;
			class.teacher = req.body.teacher ? req.body.teacher : class.teacher;
			class.fee = req.body.fee ? req.body.fee : class.fee;
			class.subjects = req.body.subjects ? req.body.subjects : class.subjects;

            class.save(function (err, class) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating class.',
                        error: err
                    });
                }

                return res.json(class);
            });
        });
    },

    /**
     * classController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        classModel.findByIdAndRemove(id, function (err, class) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the class.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
