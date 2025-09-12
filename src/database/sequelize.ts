import { Sequelize } from "sequelize";
import database from "@/config/database";

const env = process.env.NODE_ENV || "development";
const dbConfig = (database as any)[env];

if (!dbConfig) {
  throw new Error(`Database config for env "${env}" not found`);
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

export default sequelize;
