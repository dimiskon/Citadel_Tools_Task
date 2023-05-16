"use strict";

const _ = require("lodash");
const otplib = require("otplib");

const verify2FAToken = (req, res, next) => {
  const { token, secret } = _.get(req, "body", {});
  console.log({ token, secret });
  // Verify the provided 2FA token, against User's secret
  let isValid;
  try {
    isValid = otplib.authenticator.check(token, secret);
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
