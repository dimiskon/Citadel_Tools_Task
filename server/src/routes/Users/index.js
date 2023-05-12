"use strict";

const userRouter = require("express").Router();

// Middlewares
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");

// Routes
const registerUser = require("./registerUser");

// Joi Schemas
// Requests

userRouter.param("username", (req, res, next, username) => {
  req.username = username;
  next();
});

// Register User POST(/users/register)
userRouter.route("/register").post(registerUser);

module.exports = userRouter;
