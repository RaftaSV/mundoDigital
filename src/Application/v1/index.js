import express from 'express';
import users from './users/user.route.js';
import categories from './Categories/category.route.js'
import products from './Products/product.route.js'
import cart from './CartProduct/cart.route.js'
const router = express.Router();

router.use('/users', users);
router.use('/categories', categories);
router.use('/products', products);
router.use('/carts', cart);

export default router;