"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    player_id: Joi.string().default(""),
    player_name: Joi.string().default(""),
    signed: Joi.bool().default(false),
  })
  .required();
