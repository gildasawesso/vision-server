const jwt = require('jsonwebtoken');

const { JWT, ADMIN_JWT } = require('../config');

module.exports = {
  generateToken(accessTokenPayload, refreshTokenPayload) {
    const { algorithm, SECRET, accessTokenExpiryTime, refreshTokenExpiryTime } = JWT;
    const accessToken = jwt.sign(accessTokenPayload, SECRET, { algorithm, expiresIn: accessTokenExpiryTime });
    const refreshToken = jwt.sign(refreshTokenPayload, SECRET, { algorithm, expiresIn: refreshTokenExpiryTime });

    return {
      access_token: accessToken,
      expires_in: accessTokenExpiryTime,
      refresh_token: refreshToken,
    };
  },

  generateAdminToken(accessTokenPayload, refreshTokenPayload) {
    const { algorithm, SECRET, accessTokenExpiryTime, refreshTokenExpiryTime } = ADMIN_JWT;

    const accessToken = jwt.sign(accessTokenPayload, SECRET, { algorithm, expiresIn: accessTokenExpiryTime });
    const refreshToken = jwt.sign(refreshTokenPayload, SECRET, { algorithm, expiresIn: refreshTokenExpiryTime });

    return {
      access_token: accessToken,
      expires_in: accessTokenExpiryTime,
      refresh_token: refreshToken,
    };
  },

  decodeToken(token) {
    const { SECRET } = JWT;

    return jwt.verify(token, SECRET);
  },

  decodeAdminToken(token) {
    const { SECRET } = ADMIN_JWT;

    return jwt.verify(token, SECRET);
  },
};
