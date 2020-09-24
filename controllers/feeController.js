const context = require('../services/db_context');


module.exports = {
  all: async (req, res) => {
    let classrooms = await context.fees.find({ school: req.school,  }, 'name code registrationFee schoolFee reregistrationFee');
    return res.json(classrooms);
  },
};
