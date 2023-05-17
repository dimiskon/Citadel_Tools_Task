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

teamsRouter
  .route("/")
  // POST Team - ('/teams')
  .post(bodyValidator(addTeamReqSchema), addTeam)
  // Get Teams - ('/teams')
  .get(getTeams);

module.exports = teamsRouter;
