"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Players/responses/addPlayerResponseSchema");

const addTeam = async (req, res, next) => {
  const Team = _.get(req, "Team", null);
  const { Players } = _.get(req, "db.sequelize.models", {});
  const body = _.get(req, "body", {});

  const payload = { ...body, team_id: Team.team_id };
  const newPlayer = await Players.create(payload);

  res.responseBody = newPlayer;
  res.responseSchema = responseSchema;
  next();
};

module.exports = addTeam;
