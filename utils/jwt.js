const jwt = require('jsonwebtoken');

const { JWT } = require('../config');

module.exports = {
  generateToken(accessTokenPayload, refreshTokenPayload) {
    const { algorithm, secret, refreshSecret, accessTokenExpiryTime, refreshTokenExpiryTime } = JWT;
    const accessToken = jwt.sign(accessTokenPayload, secret, { algorithm, expiresIn: accessTokenExpiryTime });
    const refreshToken = jwt.sign(refreshTokenPayload, refreshSecret, { algorithm, expiresIn: refreshTokenExpiryTime });

    return {
      accessToken,
      expiresIn: accessTokenExpiryTime,
      refreshToken,
    };
  },

  decodeToken(token) {
    const { secret } = JWT;

    return jwt.verify(token, secret);
  },
};
