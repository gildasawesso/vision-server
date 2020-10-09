const { getBulletins } = require('../services/bulletin.service');

module.exports = {
  classroomBulletin: async (req, res) => {
    const bulletins = await getBulletins(req.school, req.schoolYear);
    await res.json(bulletins);
  }
};
