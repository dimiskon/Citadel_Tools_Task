"use strict";

const Joi = require("joi");

module.exports = Joi.array()
  .items({
    team_name: Joi.string().default(""),
  })
  .required();
