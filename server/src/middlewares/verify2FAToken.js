"use strict";

const _ = require("lodash");
const otplib = require("otplib");

const verify2FAToken = (req, res, next) => {
  let { token2FA, secret } = _.get(req, "body", {});

  // Login Page - Get secret from User data
  if (!secret) {
    secret = _.get(req, "user.secret", null);
  }

  // Verify the provided 2FA token, against User's secret
  let isValid;
  try {
    isValid = otplib.authenticator.check(token2FA, secret);
  } catch (error) {
    console.error({ error });
  }

  if (!isValid) {
    return next({
      statusCode: 401,
      message: "Invalid 2FA code!!!",
    });
  } else {
    return next();
  }
};

module.exports = verify2FAToken;
