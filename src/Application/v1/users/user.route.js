
import express from 'express';

import { selectUser,
    insertUsers,
    Login
 } from './user.controller.js';
const router = express.Router();

router.get('/', selectUser);
router.post('/', insertUsers);
router.post('/login', Login);



export default router;
