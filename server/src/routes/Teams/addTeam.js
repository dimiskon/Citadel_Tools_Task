"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Teams/responses/addTeamResponseSchema");

const addTeam = async (req, res, next) => {
  const { Teams } = _.get(req, "db.sequelize.models", {});
  const username = _.get(req, "User.username", null);
  const body = _.get(req, "body", {});

  const payload = { ...body, username };
  const newTeam = await Teams.create(payload);

  res.responseBody = newTeam;
  res.responseSchema = responseSchema;
  next();
};

module.exports = addTeam;
