import { Sequelize } from "sequelize";
import databaseConfig from "../database/config/database";
import fs from "fs";
import logger from "../logger";

const modelFiles = fs
  .readdirSync(__dirname + "/../database/models/")
  .filter((file) => file.endsWith(".js"));

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize(databaseConfig);

      /*
        Loading models automatically
      */
     
      for (const file of modelFiles) {
        logger.info(`[SEQUELIZE] Loading model: ${file}`);
        const model = await import(`../database/models/${file}`);
        model.default.init(connection);
      }

      modelFiles.map(async (file) => {
        const model = await import(`../database/models/${file}`);
        model.default.associate && model.default.associate(connection.models);
      });

      logger.info("[SEQUELIZE] Database service initialized");
    } catch (error) {
      logger.info("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
};

export default sequelizeService;
