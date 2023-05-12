"use strict";

const _ = require("lodash");
const bcrypt = require("bcrypt");

const UserRegistration = async (req, res) => {
  const { Users } = _.get(req, "db.sequelize.models", {});
  const body = _.get(req, "body", {});
  const username = _.get(body, "username", null);
  const password = _.get(body, "password", null);

  // Generate a salt and hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
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
    res.responseBody = newUser.get({ plain: true });
  }

  console.log("New User has been registered with values: ", newUser);
  res.responseBody = newUser;
};

module.exports = UserRegistration;
