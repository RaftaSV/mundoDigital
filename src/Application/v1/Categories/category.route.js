import express from 'express';

import {
getCategories,
insertCategories
} from './category.controller.js'

const router = express.Router();

router.get('/', getCategories);
router.post('/', insertCategories);

export default router;