"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    username: Joi.string().default(""),
    team_name: Joi.string().default(""),
  })
  .required();
