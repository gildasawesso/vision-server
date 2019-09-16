const jwt = require('express-jwt');

const { JWT, ADMIN_JWT } = require('../config');

const { SECRET } = JWT;

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

module.exports = {
  auth: {
    required: jwt({
      secret: SECRET,
      requestProperty: 'auth',
      getToken,
    }),
    admin: jwt({
      secret: ADMIN_JWT.SECRET,
      requestProperty: 'auth',
      getToken,
    }).unless({ path: ['/admin/auth/signup', '/admin/auth/signin'] }),
    optional: jwt({
      secret: SECRET,
      requestProperty: 'auth',
      credentialsRequired: false,
      getToken,
    }),
  },
};
