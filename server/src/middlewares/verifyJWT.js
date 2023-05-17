"use strict";

const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyJWT = (req, res, next) => {
  const jwtToken = _.get(req, "headers.authorization", null);
  console.log(jwtToken);
  if (!jwtToken) {
    return next({
      message: "Token not found!",
      statusCode: 401,
    });
  }

  try {
    jwt.verify(jwtToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next({
      statusCode: 403,
      message: "Unauthorized Access!",
    });
  }
};

module.exports = verifyJWT;
