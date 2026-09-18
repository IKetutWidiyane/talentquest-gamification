import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/job.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

// Public
router.get("/", getJobs);

router.get("/:id", getJobById);

// Talent Acquisition only
router.post(
  "/",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  createJob
);

router.patch(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  updateJob
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  updateJobStatus
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  deleteJob
);

export default router;