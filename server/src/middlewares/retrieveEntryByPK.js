"use strict";

const _ = require("lodash");

const retrieveEntryByPk = ({ model_name, param_name, field_name }) => {
  return async (req, res, next) => {
    const db = _.get(req, "db", null);
    const Model = _.get(db, `sequelize.models[${model_name}]`, null);
    const param_value = _.get(req, `${param_name}`, null);

    try {
      const result = await Model.findByPk(param_value);
      if (!result) {
        next({
          message: `Could not found a ${model_name} entry with ${param_name} of ${param_value}`,
          statusCode: 404,
        });
      }
      req[field_name] = result;
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
