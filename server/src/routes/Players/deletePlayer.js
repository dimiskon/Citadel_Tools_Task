"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Players/responses/deletePlayerResponseSchema");

const deleteTeam = async (req, res, next) => {
  const Player = _.get(req, "Player", {});

  try {
    await Player.destroy();

    res.responseBody = { deleted: true };
    res.responseSchema = responseSchema;
    next();
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

module.exports = deleteTeam;
