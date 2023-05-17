"use strict";

const authorizationRouter = require("express").Router();

// Middlewares
const checkUser = require("../../middlewares/checkUser");
const verify2FAToken = require("../../middlewares/verify2FAToken");
const bodyValidator = require("../../middlewares/bodyValidator");

// Routes
const generateQRCode = require("./generateQRCode");
const generateToken = require("./generateToken");
const login = require("./login");
const register = require("./register");

// Joi Schemas
// Requests
const loginReqSchema = require("../../schemas/Authorization/requests/loginUserReqSchema");
const registerReqSchema = require("../../schemas/Authorization/requests/registerUserReqSchema");

// Pre-Registration
authorizationRouter.post("/generateToken", generateToken);

// Pre-Registration QR Code secret and Img generation
authorizationRouter.get("/generateQRCode", generateQRCode);

// Register User POST(/register)
authorizationRouter.post(
  "/register",
  verify2FAToken,
  bodyValidator(registerReqSchema),
  register
);

// Login User POST(/login)
authorizationRouter.post(
  "/login",
  checkUser,
  verify2FAToken,
  bodyValidator(loginReqSchema),
  login
);

module.exports = authorizationRouter;
