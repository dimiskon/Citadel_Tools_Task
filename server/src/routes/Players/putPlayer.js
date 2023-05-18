"use strict";

const _ = require("lodash");

const responseSchema = require("../../schemas/Players/responses/putPlayerResponseSchema");

const putTeam = async (req, res, next) => {
  const Player = _.get(req, "Player", {});
  const body = _.get(req, "body", {});
  console.log({ body });
  const updatedPlayer = await Player.update(body);

  console.log(updatedPlayer);
  res.responseBody = updatedPlayer;
  res.responseSchema = responseSchema;
  next();
};

module.exports = putTeam;
