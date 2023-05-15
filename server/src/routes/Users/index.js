"use strict";

const userRouter = require("express").Router();

// Middlewares
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");
const verify2FAToken = require("../../middlewares/verify2FAToken");

// Routes
const registerUser = require("./registerUser");

// Joi Schemas
// Requests

// Register User POST(/users/register)
userRouter.post("/register", verify2FAToken, registerUser);

module.exports = userRouter;
