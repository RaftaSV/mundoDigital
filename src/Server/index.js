import express from 'express';
import cors from 'cors';
import config from '../config/index.js';
import { initializeDB } from '../dataBase/index.js';

const app = express();


const startServer = async (routes) => {
  app.use(cors());
  app.use(express.json());
  app.use(routes);
  try {
    await initializeDB();
    const { port } = config();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

export default startServer;
