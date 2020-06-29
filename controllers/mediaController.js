var mediaModel = require('../models/media.js');

/**
 * mediaController.js
 *
 * @description :: Server-side logic for managing medias.
 */
module.exports = {

    /**
     * mediaController.list()
     */
    list: function (req, res) {
        mediaModel.find(function (err, medias) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting media.',
                    error: err
                });
            }
            return res.json(medias);
        });
    },

    /**
     * mediaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        mediaModel.findOne({_id: id}, function (err, media) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting media.',
                    error: err
                });
            }
            if (!media) {
                return res.status(404).json({
                    message: 'No such media'
                });
            }
            return res.json(media);
        });
    },

    /**
     * mediaController.create()
     */
    create: function (req, res) {
        var media = new mediaModel({
			filename : req.body.filename

        });

        media.save(function (err, media) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating media',
                    error: err
                });
            }
            return res.status(201).json(media);
        });
    },

    /**
     * mediaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        mediaModel.findOne({_id: id}, function (err, media) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting media',
                    error: err
                });
            }
            if (!media) {
                return res.status(404).json({
                    message: 'No such media'
                });
            }

            media.filename = req.body.filename ? req.body.filename : media.filename;

            media.save(function (err, media) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating media.',
                        error: err
                    });
                }

                return res.json(media);
            });
        });
    },

    /**
     * mediaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        mediaModel.findByIdAndRemove(id, function (err, media) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the media.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
