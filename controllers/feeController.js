var feeModel = require('../models/fee-type.js');

/**
 * feeController.js
 *
 * @description :: Server-side logic for managing fees.
 */
module.exports = {

    /**
     * feeController.list()
     */
    list: function (req, res) {
        feeModel.find(function (err, fees) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting fee.',
                    error: err
                });
            }
            return res.json(fees);
        });
    },

    /**
     * feeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        feeModel.findOne({_id: id}, function (err, fee) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting fee.',
                    error: err
                });
            }
            if (!fee) {
                return res.status(404).json({
                    message: 'No such fee'
                });
            }
            return res.json(fee);
        });
    },

    /**
     * feeController.create()
     */
    create: function (req, res) {
        var fee = new feeModel({
			name : req.body.name,
			amount : req.body.amount,
			type : req.body.type,
			tranches : req.body.tranches,
			deadline : req.body.deadline

        });

        fee.save(function (err, fee) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating fee',
                    error: err
                });
            }
            return res.status(201).json(fee);
        });
    },

    /**
     * feeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        feeModel.findOne({_id: id}, function (err, fee) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting fee',
                    error: err
                });
            }
            if (!fee) {
                return res.status(404).json({
                    message: 'No such fee'
                });
            }

            fee.name = req.body.name ? req.body.name : fee.name;
			fee.amount = req.body.amount ? req.body.amount : fee.amount;
			fee.type = req.body.type ? req.body.type : fee.type;
			fee.tranches = req.body.tranches ? req.body.tranches : fee.tranches;
			fee.deadline = req.body.deadline ? req.body.deadline : fee.deadline;

            fee.save(function (err, fee) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating fee.',
                        error: err
                    });
                }

                return res.json(fee);
            });
        });
    },

    /**
     * feeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        feeModel.findByIdAndRemove(id, function (err, fee) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the fee.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
