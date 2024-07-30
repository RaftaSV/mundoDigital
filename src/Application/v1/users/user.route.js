
import express from 'express';

import { selectUser,
    insertUsers,
    Login,
    validationToken
 } from './user.controller.js';
const router = express.Router();

router.get('/', selectUser);
router.post('/', insertUsers);
router.post('/login', Login);
router.post('/validation', validationToken);



export default router;
