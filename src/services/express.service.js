import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import globalErrorHandler from "../middlewares/errorHandler.middleware";
import cors from "cors";
import loggingMiddleware from "../middlewares/logging.middleware";
import helmet from "helmet";
import compression from "compression";
import logger from "../logger";
import passport from 'passport';
/*
  body-parser: Parse incoming request bodies in a middleware before your handlers, 
  available under the req.body property.
*/

const routeFiles = fs
  .readdirSync(__dirname + "/../routes/")
  .filter((file) => file.endsWith(".js"));

let app;
let routes = [];

const expressService = {
  init: async () => {
    try {
      /*
        Loading routes automatically
      */
      for (const file of routeFiles) {
        const route = await import(`../routes/${file}`);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      app = express();
      app.use(helmet());
      app.use(compression());
      app.disable('x-powered-by');
      app.use(cors());
      app.use(loggingMiddleware);

      app.use(bodyParser.json());
      app.use(routes);
      app.use(globalErrorHandler);
      /** Initialize Passport */
      app.use(passport.initialize());
      app.listen(process.env.SERVER_PORT);
      logger.info("[EXPRESS] Express initialized");
    } catch (error) {
      logger.error(error);
      logger.info("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
