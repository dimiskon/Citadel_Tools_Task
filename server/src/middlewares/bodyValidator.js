"use strict";

const _ = require("lodash");

const bodyValidator = (bodySchema) => {
  return async (req, res, next) => {
    const body = _.get(req, "body", {});

    try {
      const validatedBody = await bodySchema.validateAsync(body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validatedBody;
      next();
    } catch (error) {
      const err = error.toString();
      console.error(err);
      next({
        message: err,
        statusCode: 400,
      });
    }
  };
};

module.exports = bodyValidator;
