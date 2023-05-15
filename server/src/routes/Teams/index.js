"use strict";

const teamsRouter = require("express").Router({ mergeParams: true });

// Middlewares
const bodyValidator = require("../../middlewares/bodyValidator");
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");

// Routes
const addTeam = require("./addTeam");
const getTeams = require("./getTeams");

// Joi Schemas
// Requests
const addTeamReqSchema = require("../../schemas/Teams/requests/addTeamReqSchema");

// Prefix Routing ('/users/:username/teams') - REST API Best Practices
teamsRouter
  .route("/")
  // POST Team - ('/users/:usename/teams')
  .post(
    retrieveEntryByPk({
      modelName: "Users",
      paramName: "username",
      fieldName: "User",
    }),
    bodyValidator(addTeamReqSchema),
    addTeam
  )
  // Get Teams - ('/users/:usename/teams')
  .get(
    // retrieveEntryByPk({
    //   modelName: "Users",
    //   paramName: "username",
    //   fieldName: "User",
    // }),
    getTeams
  );

module.exports = teamsRouter;
