"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    username: Joi.string().email().default(""),
  })
  .empty(null)
  .default(undefined);
