"use strict";

const Joi = require("joi");

module.exports = Joi.object().keys({
  username: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .trim()
    .required(),
  password: Joi.string().trim().required(),
  token2FA: Joi.string().trim().required(),
  secret: Joi.string().trim().required(),
});
