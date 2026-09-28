import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getCandidateProfile,
  updateCandidateProfile,
} from "../controllers/candidateProfile.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.use(
  authorize(UserRole.CANDIDATE)
);

router.get(
  "/",
  getCandidateProfile
);

router.patch(
  "/",
  updateCandidateProfile
);

export default router;