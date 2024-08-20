import express from 'express';

import {
getCategories,
insertCategories,
deleteCategory,
updateCategory
} from './category.controller.js'

const router = express.Router();

router.get('/', getCategories);
router.post('/', insertCategories);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;