import { Dialect } from "sequelize";

interface IConfig {
  [key: string]: {
    username: string;
    password: string | null;
    database: string;
    host: string;
    dialect: string;
  }
}

const database: IConfig = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "rgwebdev",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
  }
}

export default database;
