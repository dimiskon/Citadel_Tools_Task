"use strict";

const authorizationRouter = require("express").Router();

// Middlewares
const checkUser = require("../../middlewares/checkUser");
const verify2FAToken = require("../../middlewares/verify2FAToken");

// Routes
const generateQRCode = require("./generateQRCode");
const generateToken = require("./generateToken");
const login = require("./login");
const register = require("./register");

// Joi Schemas
// Requests

// Pre-Registration
authorizationRouter.post("/generateToken", generateToken);

// Pre-Registration QR Code secret and Img generation
authorizationRouter.get("/generateQRCode", generateQRCode);

// Register User POST(/register)
authorizationRouter.post("/register", verify2FAToken, register);

// Login User POST(/login)
authorizationRouter.post("/login", checkUser, verify2FAToken, login);

module.exports = authorizationRouter;
