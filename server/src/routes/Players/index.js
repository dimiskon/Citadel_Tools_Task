"use strict";

const playersRouter = require("express").Router({ mergeParams: true });

// Middlewares
const bodyValidator = require("../../middlewares/bodyValidator");
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");

// Routes
const addPlayer = require("./addPlayer");
const getPlayers = require("./getPlayers");
const deletePlayer = require("./deletePlayer");
const putTeam = require("./putPlayer");

// Joi Schemas
// Requests
const addPlayerSchema = require("../../schemas/Players/requests/addPlayerReqSchema");
const putPlayerSchema = require("../../schemas/Players/requests/putPlayerReqSchema");

playersRouter
  .route("/")
  // POST Player - ('/teams/:team_id/players')
  .post(
    retrieveEntryByPk({
      modelName: "Teams",
      paramName: "team_id",
      fieldName: "Team",
    }),
    bodyValidator(addPlayerSchema),
    addPlayer
  )
  // GET Teams - ('//teams/:team_id/players')
  .get(
    retrieveEntryByPk({
      modelName: "Teams",
      paramName: "team_id",
      fieldName: "Team",
    }),
    getPlayers
  );

// DELETE Player - ('/teams/:team_id/players/:player_id')
playersRouter
  .route("/:player_id")
  .delete(
    retrieveEntryByPk({
      modelName: "Teams",
      paramName: "team_id",
      fieldName: "Team",
    }),
    retrieveEntryByPk({
      modelName: "Players",
      paramName: "player_id",
      fieldName: "Player",
    }),
    deletePlayer
  )
  // PUT Player - ('/teams/:team_id/players/:player_id')
  .put(
    retrieveEntryByPk({
      modelName: "Teams",
      paramName: "team_id",
      fieldName: "Team",
    }),
    retrieveEntryByPk({
      modelName: "Players",
      paramName: "player_id",
      fieldName: "Player",
    }),
    bodyValidator(putPlayerSchema),
    putTeam
  );

module.exports = playersRouter;
