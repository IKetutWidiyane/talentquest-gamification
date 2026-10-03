import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["CANDIDATE", "TALENT_ACQUISITION"]),
  status: z
    .enum(["ACTIVE", "INACTIVE"])
    .optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  role: z
    .enum(["CANDIDATE", "TALENT_ACQUISITION"])
    .optional(),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]),
});