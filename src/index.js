import dotenv from "dotenv";
import expressService from "./services/express.service";
import sequelizeService from "./services/sequelize.service";
import logger from "./logger";
dotenv.config();

const services = [expressService, sequelizeService];

(async () => {
  try {
    for (const service of services) {
      await service.init();
    }
    logger.info("Server initialized.");
    //PUT ADITIONAL CODE HERE.

  } catch (error) {
    logger.info(error);
    process.exit(1);
  }
})();
