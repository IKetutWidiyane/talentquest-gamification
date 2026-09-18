import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getAssessmentById,
  getPublishedAssessmentById,
  getAssessments,
  createAssessment,
  updateAssessment,
  updateAssessmentStatus,
  deleteAssessment,
} from "../controllers/assessment.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

// Candidate
router.get(
  "/published/:id",
  authenticate,
  authorize(UserRole.CANDIDATE),
  getPublishedAssessmentById
);

// TA
router.get(
  "/",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  getAssessments
);

router.get(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  getAssessmentById
);

router.post(
  "/",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  createAssessment
);

router.patch(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  updateAssessment
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  updateAssessmentStatus
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  deleteAssessment
);

export default router;