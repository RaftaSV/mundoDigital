import express from 'express';
import v1 from '../Application/v1/index.js';  // Ruta relativa correcta

const router = express.Router();

router.use('/v1', v1);

export default router;
