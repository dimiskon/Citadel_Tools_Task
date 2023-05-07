"use strict";

const Umzug = require("umzug");
const Sequelize = require("sequelize");
const fs = require("fs");

const { sequelize, models } = require("../models");

const initUmzug = () => {
  console.log("Starting migrations...");
  const umzug = new Umzug({
    migrations: {
      // indicates the folder containing the migration .js files
      path: "./migrations/migrations",
      pattern: /\.js$/,
      // inject sequelize's QueryInterface in the migrations
      params: [
        sequelize.getQueryInterface(),
        Sequelize,
        sequelize,
        models
      ],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: "sequelize",
    storageOptions: {
      sequelize
    },

    logging: function() {
      console.log.apply(null, arguments);
    },
  });

  function logUmzugEvent(eventName) {
    return function(name) {
      console.log(`${ name } ${ eventName }`);
    };
  }

  umzug.on("migrating", logUmzugEvent("migrating"));
  umzug.on("migrated", logUmzugEvent("migrated"));
  umzug.on("reverting", logUmzugEvent("reverting"));
  umzug.on("reverted", logUmzugEvent("reverted"));

  return umzug;
};

const umzugUp = (umzug) => {
  return umzug.up();
};

const umzugDown = (umzug) => {
  return umzug.down({ to: 0 });
};

const migrations_run = () => {
  const args = process.argv.slice(2);
  const umzug = initUmzug();

  const umzugEventFile = args[0];
  const umzugEvent = JSON.parse(fs.readFileSync(umzugEventFile, "utf-8"));

  const { cmd, eventTo = "" } = umzugEvent;

  switch (cmd) {
  case "up":
    umzugUp(umzug);
    break;
  case "down":
    umzugDown(umzug, eventTo);
    break;
  default:
    console.log(`invalid cmd: ${ cmd }`);
    return `invalid cmd: ${ cmd }`;
  }

  return "migrations success";
};

migrations_run();