import express from 'express';
import cors from 'cors';
import { initializeDB } from '../dataBase/index.js';
import routes from '../routes/index.js';


const app = express();

app.use(cors());
app.use(express.json());

// Inicializa la base de datos
initializeDB().then(() => {
  // Configura las rutas después de la inicialización de la base de datos
  app.use(routes);
});

// Exporta la aplicación Express para el entorno serverless
export default (req, res) => {
  return app(req, res);
};
