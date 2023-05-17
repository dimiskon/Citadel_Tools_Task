"use strict";

const { authenticator } = require("@otplib/preset-default");

const generateToken = (req, res, next) => {
  const secret = req.body.secret;
  const token = authenticator.generate(secret);

  res.responseBody = {
    token,
  };
  next();
};

module.exports = generateToken;
