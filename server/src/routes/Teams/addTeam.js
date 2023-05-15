"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Teams/responses/addTeamResponseSchema");

const getTeams = async (req, res, next) => {
  const { Teams } = _.get(req, "db.sequelize.models", {});
  const username = _.get(req, "User.username", null);
  const body = _.get(req, "body", {});

  console.log({ body });

  const payload = { ...body, username };
  const newTeam = await Teams.create(payload);
  console.log(newTeam.dataValues);

  res.responseBody = newTeam;
  res.responseSchema = responseSchema;
  next();
};

module.exports = getTeams;
