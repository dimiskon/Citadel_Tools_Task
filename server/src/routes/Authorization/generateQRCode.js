"use strict";

const otplib = require("otplib");
const qrcode = require("qrcode");

const responseSchema = require("../../schemas/Authorization/responses/generateQRCodeResponseSchema");

const generateQRCode = async (req, res, next) => {
  const secret = otplib.authenticator.generateSecret();

  const dataURL = otplib.authenticator.keyuri("", "Teams Task", secret);

  try {
    const qrCodeURL = await qrcode.toDataURL(dataURL);
    res.responseSchema = responseSchema;
    res.responseBody = {
      qrCodeURL,
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
