"use strict";

const teamsRouter = require("express").Router({ mergeParams: true });

// Middlewares
const bodyValidator = require("../../middlewares/bodyValidator");
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");

// Routes
// const addTeam = require("./addTeam");
const getTeams = require("./getTeams");

// Joi Schemas
// Requests
// const postTeamReqSchema = require("../../validationSchemas/Teams/requests/postTeamReqSchema");

// Add Team
teamsRouter.param("username", (req, res, next, username) => {
  req.username = username;
  next();
});

// Base Route ('/users/:username/teams') - REST API Best Practices
teamsRouter
  .route("/")
  // POST Team - ('/users/:usename/teams')
  //   .post(addTeam)
  .get(
    retrieveEntryByPk({
      modelName: "Users",
      paramName: "username",
      fieldName: "User",
    }),
    getTeams
  );

module.exports = teamsRouter;
