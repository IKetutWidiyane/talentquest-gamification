import { Router } from "express";
import { UserRole } from "@prisma/client";
import { validateBody } from "../middlewares/validate.middleware";

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

import {
  createJobSchema,
  updateJobSchema,
  updateJobStatusSchema,
} from "../validators/job.validator";



const router = Router();

// Public
router.get("/", getJobs);

router.get("/:id", getJobById);

// Talent Acquisition only
router.post(
  "/",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  validateBody(createJobSchema),
  createJob
);

router.patch(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  validateBody(updateJobSchema),
  updateJob
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  validateBody(updateJobStatusSchema),
  updateJobStatus
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.TALENT_ACQUISITION),
  deleteJob
);

export default router;