const context = require('../services/db_context');

const pathExluded = ['/auth/signin', '/auth/signup' , '/users/me', '/config/admin/exist', '/config/schoolyear/exist', '/schoolyears/current', '/report/print/registration'];

module.exports = async (req, res, next) => {
  const token = getToken(req);

  if (token && !pathExluded.includes(req.url)) {
    const { schoolyear } = req.query;

    if (schoolyear) {
      const schoolYear = await context.schoolYears.one(schoolyear);

      req.schoolYear = schoolYear._id;
      req.school = schoolYear.school;
      next();
    } else {
      res.status(400).json({
        message: 'schoolYear is required',
      });
    }
  } else {
    next();
  }
};

function getToken(req) {
  const { headers, query } = req;

  if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    return headers.authorization.split(' ')[1];
  }

  if (query && query.token) {
    return query.token;
  }

  return null;
}
