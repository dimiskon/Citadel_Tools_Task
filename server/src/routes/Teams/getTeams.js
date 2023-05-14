"use strict";

const _ = require("lodash");

const getTeams = async (req, res, next) => {
  const { Users, Teams } = _.get(req, "db.sequelize.models", {});
  const { username = null } = _.get(req, "User", {});

  const userTeams = await Users.findAll({
    where: { username },
    include: [{ model: Teams, required: true }],
  });

  res.responseBody = userTeams;
  next();
};

module.exports = getTeams;
