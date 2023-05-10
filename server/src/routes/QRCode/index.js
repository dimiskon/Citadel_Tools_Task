"use strict";

const otplib = require("otplib");
const qrcode = require("qrcode");

const generateQRCode = async (req, res, next) => {
  const secret = otplib.authenticator.generateSecret();

  const otpauthUrl = otplib.authenticator.keyuri(
    "username",
    "citadel_task",
    secret
  );

  try {
    const qrCodeURL = await qrcode.toDataURL(otpauthUrl);
    res.response_body = {
      qrcode_url: qrCodeURL,
    };
    next();
  } catch (error) {
    console.error(error);
    next({
      message: error.toString(),
      statusCode: 400,
    });
  }
};

module.exports = generateQRCode;
