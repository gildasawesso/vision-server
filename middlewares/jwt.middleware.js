const jwt = require('express-jwt');

const { JWT } = require('../config');

const { secret, refreshSecret } = JWT;

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
      secret,
      requestProperty: 'auth',
      getToken,
    }),
    refresh: jwt({
      secret: refreshSecret,
      requestProperty: 'auth',
      credentialsRequired: false,
      getToken,
    }),
    optional: jwt({
      secret,
      requestProperty: 'auth',
      credentialsRequired: false,
      getToken,
    }),
  },
};
