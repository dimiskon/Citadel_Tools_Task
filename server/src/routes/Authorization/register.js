"use strict";

const _ = require("lodash");
const bcrypt = require("bcrypt");

const responseSchema = require("../../schemas/Authorization/responses/registerUserResponseSchema");

const UserRegistration = async (req, res, next) => {
  const { Users } = _.get(req, "db.sequelize.models", {});
  const body = _.get(req, "body", {});
  const username = _.get(body, "username", null);
  const password = _.get(body, "password", null);

  // Generate a salt and hash the user password
  const hashedPassword = await bcrypt.hash(password, 10);
  const payload = {
    ...body,
    password: hashedPassword,
  };

  const [newUser, created] = await Users.findOrCreate({
    where: { username },
    defaults: payload,
  });

  if (!created) {
    console.warn(`User {${newUser.username}} already exists!`);
    return next({
      statusCode: 404,
      message: `User '${newUser.username}' already exists!`,
    });
  } else {
    console.log("New User has been registered with values: ", newUser);
    res.repsonseSchema = responseSchema;
    res.responseBody = {
      registered: true,
      data: {
        username: newUser.username,
      },
      message: "User Registered successfully!",
    };
    next();
  }
};

module.exports = UserRegistration;
