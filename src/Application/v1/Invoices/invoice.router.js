import express from 'express';

import { insertInvoice } from './Controller.js';

const router = express.Router();

router.post('/', insertInvoice);

export default router;

