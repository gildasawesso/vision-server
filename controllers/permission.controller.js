var permissionModel = require('../models/permission.model.js');

/**
 * permission.controller.js
 *
 * @description :: Server-side logic for managing permissions.
 */
module.exports = {

    /**
     * permissionController.list()
     */
    list: function (req, res) {
        permissionModel.find(function (err, permissions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting permission.',
                    error: err
                });
            }
            return res.json(permissions);
        });
    },

    /**
     * permissionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        permissionModel.findOne({_id: id}, function (err, permission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting permission.',
                    error: err
                });
            }
            if (!permission) {
                return res.status(404).json({
                    message: 'No such permission'
                });
            }
            return res.json(permission);
        });
    },

    /**
     * permissionController.create()
     */
    create: function (req, res) {
        var permission = new permissionModel({
			name : req.body.name,
			resource : req.body.resource

        });

        permission.save(function (err, permission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating permission',
                    error: err
                });
            }
            return res.status(201).json(permission);
        });
    },

    /**
     * permissionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        permissionModel.findOne({_id: id}, function (err, permission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting permission',
                    error: err
                });
            }
            if (!permission) {
                return res.status(404).json({
                    message: 'No such permission'
                });
            }

            permission.name = req.body.name ? req.body.name : permission.name;
			permission.resource = req.body.resource ? req.body.resource : permission.resource;

            permission.save(function (err, permission) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating permission.',
                        error: err
                    });
                }

                return res.json(permission);
            });
        });
    },

    /**
     * permissionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        permissionModel.findByIdAndRemove(id, function (err, permission) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the permission.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
