import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getTalentPool,
  getTalentPoolById,
  addToTalentPool,
  updateTalentPool,
  deleteTalentPool,
} from "../controllers/talentPool.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.TALENT_ACQUISITION));

router.get("/", getTalentPool);
router.get("/:id", getTalentPoolById);
router.post("/", addToTalentPool);
router.patch("/:id", updateTalentPool);
router.delete("/:id", deleteTalentPool);

export default router;