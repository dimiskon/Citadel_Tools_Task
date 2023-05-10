"use strict";

const userRouter = require("express").Router();

// Middlewares
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");
const retrieveEntryByKey = require("../../middlewares/retrieveEntryByKey");

// Routes
const registerUser = require("./registerUser");

// Joi Schemas
// Requests

userRouter.param("user_id", (req, res, next, user_id) => {
  req.user_id = user_id;
  next();
});

// Register User POST(/users/:user_id)
userRouter.route("/:user_id").post(
  retrieveEntryByKey({
    model_name: "Users",
    param_name: "email_address",
    field_name: "user",
  }),
  registerUser
);

module.exports = userRouter;
