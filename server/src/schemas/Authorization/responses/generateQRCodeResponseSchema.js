"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    secret: Joi.string().default(""),
    qrCodeURL: Joi.string().default(""),
  })
  .empty({})
  .default(undefined);
