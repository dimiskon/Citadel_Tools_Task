"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Teams/responses/deleteTeamResponseSchema");

const deleteTeam = async (req, res, next) => {
  const Team = _.get(req, "Team", {});
  console.log({ Team });
  try {
    await Team.destroy();
    res.responseBody = { deleted: true };
    res.responseSchema = responseSchema;
    next();
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

module.exports = deleteTeam;
