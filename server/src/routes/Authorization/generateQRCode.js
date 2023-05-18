"use strict";

const { authenticator } = require("@otplib/preset-default");
const qrcode = require("qrcode");

const responseSchema = require("../../schemas/Authorization/responses/generateQRCodeResponseSchema");

const generateQRCode = async (req, res, next) => {
  const secret = authenticator.generateSecret(32);

  try {
    const dataURL = authenticator.keyuri("", "Teams Task", secret);
    const qrCodeURL = await qrcode.toDataURL(dataURL);

    res.responseSchema = responseSchema;
    res.responseBody = {
      secret,
      qrCodeURL,
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
