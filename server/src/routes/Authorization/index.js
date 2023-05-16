"use strict";

const authorizationRouter = require("express").Router();

// Middlewares
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");
const verify2FAToken = require("../../middlewares/verify2FAToken");

// Routes
const generateQRCode = require("./generateQRCode");
const register = require("./register");

// Joi Schemas
// Requests

// Pre-Registration QR Code secret and Img generation
authorizationRouter.get("/generateQRCode", generateQRCode);

// Register User POST(/register)
authorizationRouter.post("/register", verify2FAToken, register);

module.exports = authorizationRouter;
