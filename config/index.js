require('dotenv').config({ path: `${__dirname}/../.env` });

const { checkEnvironmentVariables } = require('../utils/env');

const envVariables = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];

checkEnvironmentVariables(envVariables);

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
const isDevelopment = !isProduction;

module.exports = {
  // Server options
  host: '0.0.0.0',
  port: 3010,

  // Application environment
  env,
  isProduction,
  isDevelopment,

  // Database config
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  // JWT config
  JWT: {
    algorithm: 'HS256',
    accessTokenExpiryTime: 60 * 60 * 24 * 30, // 60 seconds * 60 min * 24 h * 30 days = 1 mois
    refreshTokenExpiryTime: 60 * 60 * 24 * 30 * 2, // 60 seconds * 60 min * 24 h * 30 days * 2 = 2 mois
    SECRET: process.env.JWT_SECRET,
  },

  ADMIN_JWT: {
    algorithm: 'HS256',
    accessTokenExpiryTime: 60 * 60 * 24 * 30, // 60 seconds * 60 min * 24 h * 30 days = 1 mois
    refreshTokenExpiryTime: 60 * 60 * 24 * 30 * 2, // 60 seconds * 60 min * 24 h * 30 days * 2 = 2 mois
    SECRET: process.env.JWT_ADMIN_SECRET,
  },
};
