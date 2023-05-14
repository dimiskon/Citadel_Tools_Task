"use strict";

const userRouter = require("express").Router();

// Middlewares
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");

// Routes
const registerUser = require("./registerUser");

// Joi Schemas
// Requests

// Register User POST(/users/register)
userRouter.post("/register", registerUser);

module.exports = userRouter;
