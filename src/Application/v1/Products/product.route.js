import express from "express"
import {
getProductByCategoryId,
getProductById,
insertProduct
} from './product.controller.js'

const router = express.Router();

router.get('/getById/:productId', getProductById);
router.get('/:categoryId', getProductByCategoryId);
router.post('/', insertProduct);

export default router;