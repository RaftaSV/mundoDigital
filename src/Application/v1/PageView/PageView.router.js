import express from 'express';
import {
getPageViews,
insertPageView
} from './PageView.controller.js'
const router = express.Router();


router.get('/', getPageViews);
router.post('/', insertPageView);

export default router;
