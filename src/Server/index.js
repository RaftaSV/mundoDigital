import express from 'express';
import cors from 'cors';

import config from '../config/index.js';
import { initializeDB } from '../dataBase/index.js';

const { port } = config();

const app = express();

// creating Server
const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();
  app.use(cors());
  // json parse
  app.use(express.json());
 
  // set urls
  app.use(routes);

  // create express app
  app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
  });
};

export default initializeServer;
