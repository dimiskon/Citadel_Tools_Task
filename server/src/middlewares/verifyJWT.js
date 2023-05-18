"use strict";

const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyJWT = (req, res, next) => {
  const jwtToken = _.get(req, "headers.authorization", null);

  if (!jwtToken) {
    return next({
      message: "JWT token not found!",
      statusCode: 404,
    });
  }

  try {
    const userDetails = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const username = _.get(userDetails, "username", "");
    req.User = { username };
    next();
  } catch (error) {
    next({
      statusCode: 403,
      message: "Unauthorized Access",
    });
  }
};

module.exports = verifyJWT;
