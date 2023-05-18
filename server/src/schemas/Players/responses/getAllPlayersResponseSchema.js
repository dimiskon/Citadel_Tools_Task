"use strict";

const Joi = require("joi");

module.exports = Joi.array()
  .items({
    player_id: Joi.string().uuid({ version: "uuidv4" }).default(""),
    player_name: Joi.string().default(""),
    signed: Joi.bool().default(false),
  })
  .required();
