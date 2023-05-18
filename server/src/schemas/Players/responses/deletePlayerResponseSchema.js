"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    deleted: Joi.bool().default(false),
  })
  .required();
