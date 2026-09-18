import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  createApplication,
  getMyApplications,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
} from "../controllers/application.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

// =====================================================
// CANDIDATE
// =====================================================

router.post(
  "/",
  authorize(UserRole.CANDIDATE),
  createApplication
);

router.get(
  "/my",
  authorize(UserRole.CANDIDATE),
  getMyApplications
);

// =====================================================
// TA
// =====================================================

router.get(
  "/",
  authorize(UserRole.TALENT_ACQUISITION),
  getApplications
);

// =====================================================
// CANDIDATE + TA
// =====================================================

router.get(
  "/:id",
  authorize(
    UserRole.CANDIDATE,
    UserRole.TALENT_ACQUISITION
  ),
  getApplicationById
);

// =====================================================
// TA
// =====================================================

router.patch(
  "/:id/status",
  authorize(UserRole.TALENT_ACQUISITION),
  updateApplicationStatus
);

export default router;