import express from 'express';
import users from './users/user.route.js';
import categories from './Categories/category.route.js'
import products from './Products/product.route.js'
import cart from './CartProduct/cart.route.js'
import PageView from './PageView/PageView.router.js'
import Invoice from './Invoices/invoice.router.js';
const router = express.Router();

router.use('/users', users);
router.use('/categories', categories);
router.use('/products', products);
router.use('/carts', cart);
router.use('/pageView', PageView);
router.use('/invoices', Invoice);
export default router;