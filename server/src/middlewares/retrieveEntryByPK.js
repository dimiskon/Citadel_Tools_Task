"use strict";

const _ = require("lodash");

const retrieveEntryByPk = ({ modelName, paramName, fieldName }) => {
  return async (req, res, next) => {
    const db = _.get(req, "db", null);
    const Model = _.get(db, `sequelize.models[${modelName}]`, null);
    const paramValue = _.get(req, `${paramName}`, null);

    try {
      const result = await Model.findByPk(paramValue);
      if (!result) {
        next({
          message: `Could not found a ${modelName} entry with ${paramName} of ${paramValue}`,
          statusCode: 404,
        });
      }
      req[fieldName] = result;
      next();
    } catch (error) {
      const err = error.toString();
      console.log(err);
      next({
        message: err,
        statusCode: 400,
      });
    }
  };
};

module.exports = retrieveEntryByPk;
