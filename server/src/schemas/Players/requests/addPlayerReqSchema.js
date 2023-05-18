"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    player_name: Joi.string().trim().required(),
    signed: Joi.bool().required(),
  })
  .required();
