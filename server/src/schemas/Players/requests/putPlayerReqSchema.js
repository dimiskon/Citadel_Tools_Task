"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    signed: Joi.bool().required(),
  })
  .required();
