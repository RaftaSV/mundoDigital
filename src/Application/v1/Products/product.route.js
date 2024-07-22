import express from "express"
import {
getProductByCategoryId,
insertProduct
} from './product.controller.js'

const router = express.Router();

router.get('/:categoryId', getProductByCategoryId);
router.post('/', insertProduct);

export default router;