"use strict";

const Joi = require("joi");

module.exports = Joi.array()
  .items({
    team_id: Joi.string().uuid({ version: "uuidv4" }).default(""),
    team_name: Joi.string().default(""),
  })
  .required();
