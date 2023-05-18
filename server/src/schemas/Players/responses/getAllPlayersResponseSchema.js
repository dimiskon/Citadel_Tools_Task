"use strict";

const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    team_id: Joi.string().uuid({ version: "uuidv4" }).default(""),
    team_name: Joi.string().default(""),
    Players: Joi.array().items({
      player_id: Joi.string().uuid({ version: "uuidv4" }).default(""),
      player_name: Joi.string().default(""),
      signed: Joi.bool().default(false),
    }),
  })
  .default({});
