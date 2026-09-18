import { z } from "zod";
import { AssessmentStatus } from "@prisma/client";

export const createAssessmentSchema = z.object({
  name: z
    .string()
    .min(1, "Assessment name is required")
    .max(150)
    .trim(),

  objective: z
    .string()
    .max(1000)
    .trim()
    .optional(),

  status: z
    .nativeEnum(AssessmentStatus)
    .optional()
    .default(AssessmentStatus.DRAFT),
});

export const updateAssessmentSchema =
  createAssessmentSchema.partial();

export const updateAssessmentStatusSchema = z.object({
  status: z.nativeEnum(AssessmentStatus),
});