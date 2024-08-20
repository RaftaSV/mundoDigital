import express from "express"
import {
getProductByCategoryId,
getProductById,
insertProduct,
updateProduct,
deleteProduct
} from './product.controller.js'

const router = express.Router();

router.get('/getById/:productId', getProductById);
router.get('/:categoryId', getProductByCategoryId);
router.put('/:productId', updateProduct)
router.post('/', insertProduct);
router.delete('/:productId', deleteProduct);

export default router;