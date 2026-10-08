import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  getDashboardAnalytics,
} from "../controllers/analytics.controller";

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.TALENT_ACQUISITION));

router.get(
  "/dashboard",
  getDashboardAnalytics
);

export default router;