const { getBulletins } = require('../services/bulletin.service');

module.exports = {
  classroomBulletin: async (req, res) => {
    try {
      const bulletins = await getBulletins(req.school, req.schoolYear);
      await res.json(bulletins);
    } catch (error) {
      await res.status(500).json(error);
    }
  }
};
