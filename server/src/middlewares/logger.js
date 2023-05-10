"use strict";

const { originUrl } = require("../constants");

const logger = (req, res, next) => {
  console.log(`Entering original URL of ${originUrl}${req.originalUrl}`);
  next();
};

module.exports = logger;