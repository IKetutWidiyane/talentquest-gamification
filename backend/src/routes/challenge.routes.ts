import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  createChallengeOption,
  updateChallengeOption,
  deleteChallengeOption,
} from "../controllers/challenge.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.TALENT_ACQUISITION));

router.get("/", getChallenges);

router.get("/:id", getChallenge);

router.post("/", createChallenge);

router.patch("/:id", updateChallenge);

router.delete("/:id", deleteChallenge);

router.post("/:id/options", createChallengeOption);

router.patch(
  "/:id/options/:optionId",
  updateChallengeOption
);

router.delete(
  "/:id/options/:optionId",
  deleteChallengeOption
);

export default router;