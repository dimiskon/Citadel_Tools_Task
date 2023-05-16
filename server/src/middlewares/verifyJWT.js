"use strict";

const jwt = require("jsonwebtoken");
const _ = require("lodash");

const authorization = (req, res, next) => {
  const jwtToken = _.get(req, "headers.authorization", null);

  if (!jwtToken) {
    next({
      message: "Token not found!",
      statusCode: 401,
    });
    return;
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next({
        message: "Unauthorized Access!",
        statusCode: 403,
      });
      return;
    }

    req.user = user;
    next();
  });
};

module.exports = authorization;
