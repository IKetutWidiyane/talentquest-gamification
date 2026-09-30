import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getCompetencies,
  getCompetency,
  createCompetency,
  updateCompetency,
  deleteCompetency,
} from "../controllers/competency.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.use(
  authorize(UserRole.TALENT_ACQUISITION)
);

router.get("/", getCompetencies);

router.get("/:id", getCompetency);

router.post("/", createCompetency);

router.patch("/:id", updateCompetency);

router.delete("/:id", deleteCompetency);

export default router;