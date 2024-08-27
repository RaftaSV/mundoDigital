import express from "express"
import { 
    insertCartUser,
    getCartByUser,
    deleteProductCart
} from './cart.controller.js'

const router = express.Router();

router.get('/:userId', getCartByUser);
router.post('/', insertCartUser);
router.delete('/:cartId', deleteProductCart);

export default router;