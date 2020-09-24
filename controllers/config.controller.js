const context = require('../services/db_context');

module.exports = {
  isAdminExist: async(req, res) => {
    const number = await context.users.Model.count();
    number > 0 ? res.json(true) : res.json(false);
  },

  isSchoolYearExist: async(req, res) => {
    const userId = req.auth._id;
    const user = await context.users.one(userId).populate('schools');
    const school = user.schools[0];
    const schoolYears = await context.schoolYears.find({school: school});
    schoolYears.length > 0 ? res.json(true) : res.json(false);
  }
};
