var resourceModel = require('../models/permission-resource.js');

/**
 * resource.controller.js
 *
 * @description :: Server-side logic for managing resources.
 */
module.exports = {

    /**
     * resourceController.list()
     */
    list: function (req, res) {
        resourceModel.find(function (err, resources) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting resource.',
                    error: err
                });
            }
            return res.json(resources);
        });
    },

    /**
     * resourceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        resourceModel.findOne({_id: id}, function (err, resource) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting resource.',
                    error: err
                });
            }
            if (!resource) {
                return res.status(404).json({
                    message: 'No such resource'
                });
            }
            return res.json(resource);
        });
    },

    /**
     * resourceController.create()
     */
    create: function (req, res) {
        var resource = new resourceModel({
			name : req.body.name

        });

        resource.save(function (err, resource) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating resource',
                    error: err
                });
            }
            return res.status(201).json(resource);
        });
    },

    /**
     * resourceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        resourceModel.findOne({_id: id}, function (err, resource) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting resource',
                    error: err
                });
            }
            if (!resource) {
                return res.status(404).json({
                    message: 'No such resource'
                });
            }

            resource.name = req.body.name ? req.body.name : resource.name;

            resource.save(function (err, resource) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating resource.',
                        error: err
                    });
                }

                return res.json(resource);
            });
        });
    },

    /**
     * resourceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        resourceModel.findByIdAndRemove(id, function (err, resource) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the resource.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
