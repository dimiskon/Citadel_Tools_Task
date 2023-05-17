"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Teams/responses/getAllTeamsResponseSchema");

const getTeams = async (req, res, next) => {
  const { Users, Teams } = _.get(req, "db.sequelize.models", {});
  const username = _.get(req, `params.username`, "aaaa");

  const userTeams = await Users.findOne({
    where: { username },
    include: [
      {
        model: Teams,
        required: true,
      },
    ],
  });

  const teams = _.get(userTeams, "Teams", []);

  res.responseBody = teams;
  res.responseSchema = responseSchema;
  next();
};

module.exports = getTeams;
