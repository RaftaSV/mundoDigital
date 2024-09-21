import express from "express"
import {
getProductByCategoryId,
getProductById,
insertProduct,
updateProduct,
deleteProduct,
getProductInformation
} from './product.controller.js'

const router = express.Router();

router.get('/getById/:productId', getProductById);
router.get('/:categoryId', getProductByCategoryId);
router.put('/:productId', updateProduct)
router.post('/', insertProduct);
router.delete('/:productId', deleteProduct);
router.get('/information/:date', getProductInformation);

export default router;