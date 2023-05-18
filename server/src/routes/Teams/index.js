"use strict";

const teamsRouter = require("express").Router({ mergeParams: true });

// Middlewares
const bodyValidator = require("../../middlewares/bodyValidator");
const retrieveEntryByPk = require("../../middlewares/retrieveEntryByPK");

// Routes
const addTeam = require("./addTeam");
const getTeams = require("./getTeams");
const deleteTeam = require("./deleteTeam");

// Joi Schemas
// Requests
const addTeamReqSchema = require("../../schemas/Teams/requests/addTeamReqSchema");

teamsRouter
  .route("/")
  // POST Team - ('/teams')
  .post(bodyValidator(addTeamReqSchema), addTeam)
  // GET Teams - ('/teams')
  .get(getTeams);

// DELETE Team - ('/teams/:team_id')
teamsRouter.route("/:team_id").delete(
  retrieveEntryByPk({
    modelName: "Teams",
    paramName: "team_id",
    fieldName: "Team",
  }),
  deleteTeam
);

module.exports = teamsRouter;
