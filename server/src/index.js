"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// Routes
const generateQRCode = require("./routes/QRCode");

// Routers
const usersRouter = require("./routes/Users");
// const teamsRouter = require("./routes/ranks");

// Middlewares
const dbConnector = require("./middlewares/dbConnector");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const filterOutResponse = require("./middlewares/filterOutResponse");

const startServer = async () => {
  try {
    app.use(cors());
    app.use(express.json());

    // Start the web server on the specified port.
    app.listen(PORT, () => {
      console.log(`Server is up and running at: http://localhost:${PORT}`);
    });

    // DB connection
    app.use(dbConnector);

    // Middlewares - Before
    app.use(logger);

    // Home Page
    app.get("/", (req, res) => {
      res.send("HOME PAGE");
    });

    // QRCode Route
    app.get("/generateQRCode", generateQRCode);

    // Routers
    app.use("/users", usersRouter);

    // app.use("/teams", teamsRouter);

    // Middlewares - After
    app.use(filterOutResponse);

    //The 404 Route
    app.use((req, res, next) => {
      next({
        statusCode: 404,
        message: "Page not found!",
      });
    });

    // Error Handling Middleware
    app.use(errorHandler);
  } catch (error) {
    console.log("Unable to connect to the database:", error.original);
  }
};

startServer();
