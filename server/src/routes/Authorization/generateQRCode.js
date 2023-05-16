"use strict";

const { authenticator } = require("@otplib/preset-default");
const qrcode = require("qrcode");

authenticator.allOptions();

const responseSchema = require("../../schemas/Authorization/responses/generateQRCodeResponseSchema");

const generateQRCode = async (req, res, next) => {
  const secret = authenticator.generateSecret();
  console.log({ secret });
  const token = authenticator.generate(secret);
  const dataURL = authenticator.keyuri(
    encodeURIComponent(""),
    encodeURIComponent("Teams Task"),
    secret
  );

  try {
    const qrCodeURL = await qrcode.toDataURL(dataURL);
    res.responseSchema = responseSchema;
    res.responseBody = {
      qrCodeURL,
      secret,
      token,
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
