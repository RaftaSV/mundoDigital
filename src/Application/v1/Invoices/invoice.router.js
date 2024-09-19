import express from 'express';

import { insertInvoice, getInvoicesByDate } from './Controller.js';

const router = express.Router();

router.get('/:date', getInvoicesByDate);
router.post('/', insertInvoice);

export default router;

