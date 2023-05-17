"use strict";

const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  const { Users } = _.get(req, "db.sequelize.models", {});
  const body = _.get(req, "body", {});
  const { username, password } = body;

  try {
    const user = await Users.findByPk(username);
    if (!user) {
      return next({
        statusCode: 404,
        message: `User '${username}' not found!`,
      });
    }

    // Ecrypt the provided password and compare against the User.password
    // that stored in DB, on User Registration
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next({
        statusCode: 401,
        message: "Invalid Password!",
      });
    }

    // Generate a JWT for this User
    const JWT = jwt.sign(
      {
        username: user.username,
        token: user.token,
      },
      JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.status(200).json({ JWT });
  } catch (error) {
    return next({
      statusCode: 401,
      message: "Failed to Login!",
    });
  }
};

module.exports = login;
