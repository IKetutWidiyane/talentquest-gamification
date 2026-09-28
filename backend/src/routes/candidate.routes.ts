import { Router } from "express";

import { UserRole } from "@prisma/client";

import {
  getCandidates,
  getCandidate,
} from "../controllers/candidate.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.use(
  authorize(UserRole.TALENT_ACQUISITION)
);

router.get("/", getCandidates);

router.get("/:id", getCandidate);

export default router;