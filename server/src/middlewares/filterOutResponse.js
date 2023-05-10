"use strict";

const _ = require("lodash");

function getRawData(data) {
  if (Array.isArray(data)) {
    return data.map((item) => {
      return item.get ? item.get({ plain: true }) : item;
    });
  }
  return data.get ? data.get({ plain: true }) : data;
}

module.exports = async (req, res, next) => {
  const response_body = _.get(res, "response_body", null);
  const response_schema = _.get(res, "response_schema", null);

  if (!response_body) {
    next();
    return;
  }

  // Calling getRawData to obtain ONLY the raw data values.
  // There are cases when we'll receive of a Sequelize Object
  // or Array of Objects and therefore we need to normalize it.
  const response_body_raw = getRawData(response_body);

  if (!response_schema) {
    res.status(200).json(response_body_raw);
    return;
  }

  try {
    console.log("Filtering Response...");
    const value = await response_schema.validateAsync(response_body_raw, {
      stripUnknown: true,
    });

    console.log("Filtering Response: Successfully!");
    res.send(value);
  } catch (err) {
    const filter_response_warning = `filter-out-warning - there was an error in the filter out response!`;
    console.warn(filter_response_warning);
    next({
      statusCode: 400,
      message: err,
    });
  }
};
