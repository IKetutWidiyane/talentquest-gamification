import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

import {
  getDashboardAnalytics,
  getApplicationAnalytics,
  getRecruitmentAnalytics,
  getAssessmentAnalytics,
  getTalentPoolAnalytics,
} from "../controllers/analytics.controller";

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.TALENT_ACQUISITION));

router.get(
  "/dashboard",
  getDashboardAnalytics
);

router.get(
  "/applications",
  getApplicationAnalytics
);

router.get(
  "/recruitment",
  getRecruitmentAnalytics
);

router.get(
  "/assessments",
  getAssessmentAnalytics
);

router.get(
  "/talent-pool",
  getTalentPoolAnalytics
);

export default router;