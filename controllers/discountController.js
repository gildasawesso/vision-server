var discountModel = require('../models/discount.js');

/**
 * discountController.js
 *
 * @description :: Server-side logic for managing discounts.
 */
module.exports = {

    /**
     * discountController.list()
     */
    list: function (req, res) {
        discountModel.find(function (err, discounts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting discount.',
                    error: err
                });
            }
            return res.json(discounts);
        });
    },

    /**
     * discountController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        discountModel.findOne({_id: id}, function (err, discount) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting discount.',
                    error: err
                });
            }
            if (!discount) {
                return res.status(404).json({
                    message: 'No such discount'
                });
            }
            return res.json(discount);
        });
    },

    /**
     * discountController.create()
     */
    create: function (req, res) {
        var discount = new discountModel({
			name : req.body.name,
			type : req.body.type

        });

        discount.save(function (err, discount) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating discount',
                    error: err
                });
            }
            return res.status(201).json(discount);
        });
    },

    /**
     * discountController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        discountModel.findOne({_id: id}, function (err, discount) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting discount',
                    error: err
                });
            }
            if (!discount) {
                return res.status(404).json({
                    message: 'No such discount'
                });
            }

            discount.name = req.body.name ? req.body.name : discount.name;
			discount.type = req.body.type ? req.body.type : discount.type;

            discount.save(function (err, discount) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating discount.',
                        error: err
                    });
                }

                return res.json(discount);
            });
        });
    },

    /**
     * discountController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        discountModel.findByIdAndRemove(id, function (err, discount) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the discount.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
