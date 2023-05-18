"use strict";

const { authenticator } = require("@otplib/preset-default");

const generateToken = (req, res, next) => {
  const secret = req.body.secret;
  const token2FA = authenticator.generate(secret);

  res.responseBody = {
    token2FA,
  };
  next();
};

module.exports = generateToken;
