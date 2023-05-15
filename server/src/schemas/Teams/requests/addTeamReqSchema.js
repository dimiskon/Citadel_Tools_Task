"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    team_name: Joi.string().trim().required(),
  })
  .required();
