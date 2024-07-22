// api/index.js
import express from 'express';
import cors from 'cors';
import { initializeDB } from '../dataBase/index.js';

const app = express();

// Configuración de Express
app.use(cors());
app.use(express.json());

// Exportar la función que maneja las solicitudes
export default async (req, res) => {
  try {
    // Inicializa la base de datos si es necesario
    await initializeDB();

    // Maneja las solicitudes Express
    app(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
