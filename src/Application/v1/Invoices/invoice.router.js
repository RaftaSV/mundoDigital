import express from 'express';

import { insertInvoice } from './invoice.Controller.js';

const router = express.Router();

router.post('/', insertInvoice);

export default router;

