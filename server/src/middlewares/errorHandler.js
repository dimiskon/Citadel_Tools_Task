"use strict";

const errorHandler = (err, req, res, next) => {
  console.error("An ERROR occured!!!");

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong!";
  console.error({ ERROR: errMsg });

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    path: req.originalUrl,
  });

  next();
};

module.exports = errorHandler;
