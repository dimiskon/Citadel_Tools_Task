"use strict";

const _ = require("lodash");
const bcrypt = require("bcrypt");

const UserRegistration = async (req, res) => {
  const user = _.get(req, "user", {});
  if (user) {
    console.warn(`User ${user.user_id} already exists!`);
    res.response_body = user.get({ plain: true });
  }

  const { Users } = _.get(req, "db.sequelize.models", {});
  const body = _.get(req, "body", {});
  const password = _.get(body, "password", null);

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const payload = {
    ...body,
    password: hashedPassword,
  };
  const newUser = await Users.create(payload);

  res.response_body = newUser;
};

module.exports = UserRegistration;
