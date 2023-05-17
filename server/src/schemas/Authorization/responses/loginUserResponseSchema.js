"use strict";

const Joi = require("joi");

module.exports = Joi.object().keys({ JWT: Joi.string().default("") });
