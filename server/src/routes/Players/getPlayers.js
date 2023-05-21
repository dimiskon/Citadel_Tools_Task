"use strict";

const _ = require("lodash");
const { Op } = require("sequelize");
const responseSchema = require("../../schemas/Players/responses/getAllPlayersResponseSchema");

const getTeams = async (req, res, next) => {
  const { Players, Teams } = _.get(req, "db.sequelize.models", {});
  const team_id = _.get(req, "Team.team_id", null);
  const player_name = _.get(req, "query.player_name", "");

  const teamPlayers = await Teams.findOne({
    where: { team_id },
    include: [
      {
        model: Players,
        required: false,
        where: {
          player_name: {
            [Op.startsWith]: `%${player_name}%`,
          },
        },
      },
    ],
  });

  res.responseBody = teamPlayers;
  res.responseSchema = responseSchema;
  next();
};

module.exports = getTeams;
