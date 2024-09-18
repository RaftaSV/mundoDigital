import express, { Router } from 'express';

import { insertInvoice } from './invoice.controller.js';

const router = express.Router();

router.post('/', insertInvoice);

export default router;

