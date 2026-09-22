import { Router } from "express";

import { UserRole } from "@prisma/client";

import {
  startAssessment,
  getAttempt,
  submitResponse,
  completeAssessment,
} from "../controllers/assessmentAttempt.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(UserRole.CANDIDATE),
  startAssessment
);

router.get(
  "/:id",
  authorize(UserRole.CANDIDATE),
  getAttempt
);

router.post(
  "/:id/responses",
  authorize(UserRole.CANDIDATE),
  submitResponse
);

router.post(
  "/:id/complete",
  authorize(UserRole.CANDIDATE),
  completeAssessment
);

export default router;