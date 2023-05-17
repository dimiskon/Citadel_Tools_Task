"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    username: Joi.string()
      .email({
        tlds: {
          allow: false,
        },
      })
      .trim()
      .required(),
    password: Joi.string().trim().required(),
    token: Joi.string().trim().required(),
  })
  .required();
