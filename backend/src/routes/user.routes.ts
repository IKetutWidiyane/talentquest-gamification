import { Router } from "express";
import { UserRole } from "@prisma/client";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
} from "../controllers/user.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.TALENT_ACQUISITION));

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.patch("/:id/status", updateUserStatus);
router.delete("/:id", deleteUser);

export default router;