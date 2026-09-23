import { Router } from "express";

import { UserRole } from "@prisma/client";

import { getCandidateAssessmentResult } from "../controllers/assessmentResult.controller";
import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.get(
  "/applications/:applicationId",
  authorize(UserRole.TALENT_ACQUISITION),
  getCandidateAssessmentResult
);

export default router;