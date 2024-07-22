import { Sequelize } from 'sequelize';
import getConfig from '../config/index.js';

const { database } = getConfig();

// Import mysql2 explicitly
import mysql2 from 'mysql2';

/* eslint-disable new-cap */
export const dataBaseConnection = new Sequelize(
  database.database,
  database.user,
  database.password,
  {
    host: database.host,
    port: database.port,
    dialect: 'mysql', // Ensure you specify 'mysql' here
    dialectModule: mysql2, // Use mysql2 module explicitly
    define: {
      timestamps: false
    },
    dialectOptions: {
      connectTimeout: 60000, // 60 seconds
    },
    logging: false,
  }
);

export const initializeDB = async () => {
  try {
    await dataBaseConnection.authenticate();
    console.log(`Connected to database ${database.database}`);
  } catch (error) {
    console.error('Connection to database failed:', error);
  }
};
