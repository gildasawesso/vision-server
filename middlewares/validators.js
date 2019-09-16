const { celebrate, Joi } = require('celebrate');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    firstname: Joi.string()
      .email()
      .required()
      .trim(),
    lastname: Joi.string()
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{7,30}$/)
      .required()
      .trim(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .trim(),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    username: Joi.string()
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .trim()
      .required(),
  }),
});

module.exports.validateRegistration = validateRegistration;
module.exports.validateAuthentication = validateAuthentication;
