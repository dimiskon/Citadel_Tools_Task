"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Teams/responses/getAllTeamsResponseSchema");

const getTeams = async (req, res, next) => {
  const { Players, Teams } = _.get(req, "db.sequelize.models", {});
  const team_id = _.get(req, "Team.team_id", null);

  const teamPlayers = await Teams.findOne({
    where: { team_id },
    include: [
      {
        model: Players,
        required: true,
      },
    ],
  });

  const players = _.get(teamPlayers, "Players", []);

  res.responseBody = players;
  res.responseSchema = responseSchema;
  next();
};

module.exports = getTeams;
