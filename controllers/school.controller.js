const context = require('../services/db_context');
const { School } = require('../models');
const { getSchools, getSchool, addSchool, updateSchool, removeSchool } = require('../services/school.service');

module.exports = {
  async list(req, res) {
    const school = await context.schools.one(req.school)
    res.json(school);
  },

  async show(req, res) {
    const { id } = req.params;

    const school = await getSchool(id);

    return res.json(school);
  },

  async create(req, res) {
    const school = await addSchool(req.body);

    return res.json(school);
  },

  update(req, res) {
    const { id } = req.params;

    School.findOne({ _id: id }, function(err, school) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting school',
          error: err,
        });
      }
      if (!school) {
        return res.status(404).json({
          message: 'No such school',
        });
      }

      school.name = req.body.name ? req.body.name : school.name;
      school.address = req.body.address ? req.body.address : school.address;
      school.phone = req.body.phone ? req.body.phone : school.phone;
      school.email = req.body.email ? req.body.email : school.email;
      school.objectId = req.body.objectId ? req.body.objectId : school.objectId;

      school.save(function(err, school) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating school.',
            error: err,
          });
        }

        return res.json(school);
      });
    });
  },

  /**
   * schoolController.remove()
   */
  remove(req, res) {
    const { id } = req.params;

    School.findByIdAndRemove(id, function(err, school) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the school.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
