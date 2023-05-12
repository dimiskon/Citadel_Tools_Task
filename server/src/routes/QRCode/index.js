"use strict";

const otplib = require("otplib");
const qrcode = require("qrcode");

const generateQRCode = async (req, res, next) => {
  const secret = otplib.authenticator.generateSecret();

  const otpauthUrl = otplib.authenticator.keyuri(
    "",
    "Citadel Tools Task",
    secret
  );

  try {
    const QRCodeURL = await qrcode.toDataURL(otpauthUrl);
    res.responseBody = {
      QRCodeURL,
      secret,
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
