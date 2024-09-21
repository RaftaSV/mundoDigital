import express from 'express';

import { insertInvoice, getInvoicesByDate, getInformation } from './Controller.js';

const router = express.Router();

router.get('/:date', getInvoicesByDate);
router.get('/information/:date', getInformation);
router.post('/', insertInvoice);

export default router;

