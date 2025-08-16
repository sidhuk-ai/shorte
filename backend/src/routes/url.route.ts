import { Router } from "express";
import { createUrl, getUrlAnalytics } from "../controllers/url";

const router = Router();

router.post('/', createUrl);
router.get('/analytics/:shortId',getUrlAnalytics);

export default router;