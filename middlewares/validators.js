const { celebrate, Joi } = require('celebrate');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    firstname: Joi.string()
      .required()
      .trim(),
    lastname: Joi.string()
      .required()
      .trim(),
    isAdmin: Joi.boolean(),
    password: Joi.string()
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
      .required()
      .trim(),
    password: Joi.string()
      .trim()
      .required(),
  }),
});

module.exports.validateRegistration = validateRegistration;
module.exports.validateAuthentication = validateAuthentication;
