import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  startAssessment,
  getAttempt,
  submitResponse,
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

export default router;