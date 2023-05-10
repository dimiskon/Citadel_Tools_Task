"use strict";

const db = require("../../models");

const dbConnector = async(req, res, next) => {
  await db.sequelize.authenticate();
  console.log("Connection has been established successfully!");

  req.db = db;
  next();
};

module.exports = dbConnector;