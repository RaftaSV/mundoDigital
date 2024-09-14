import express from 'express'

import {
getViewPage
} from './GoogleAnalytics.controllers.js'

const router = express.Router();

router.get('/', getViewPage);

export default router;