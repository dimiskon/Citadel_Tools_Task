"use strict";

const _ = require("lodash");

const checkUser = async (req, res, next) => {
  const { Users } = _.get(req, "db.sequelize.models", {});
  const username = _.get(req, "body.username", {});

  const user = await Users.findByPk(username);

  if (!user) {
    return next({
      message: `User ${username} not found!`,
      statusCode: 404,
    });
  } else {
    req.user = user;
  }
  next();
};

module.exports = checkUser;
