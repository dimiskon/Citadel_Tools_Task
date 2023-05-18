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
  const responseBody = _.get(res, "responseBody", null);
  const responseSchema = _.get(res, "responseSchema", null);

  if (!responseBody) {
    return next();
  }
  // Calling getRawData to obtain ONLY the raw data values.
  // There are cases when we'll receive of a Sequelize Object
  // or Array of Objects and therefore we need to normalize it.
  const responseBodyRaw = getRawData(responseBody);

  if (!responseSchema) {
    res.status(200).json(responseBodyRaw);
    return next();
  }

  try {
    console.log("Filtering Response...");
    const value = await responseSchema.validateAsync(responseBodyRaw, {
      stripUnknown: true,
    });

    console.log("Filtering Response: Successfully!");
    return res.status(200).json(value);
  } catch (err) {
    const filterResponseWarning = `filter-out-warning - there was an error in the filter out response!`;
    console.warn(filterResponseWarning);
    next({
      statusCode: 400,
      message: err,
    });
  }
};
