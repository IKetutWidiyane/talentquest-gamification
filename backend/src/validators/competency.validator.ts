import { z } from "zod";

export const createCompetencySchema = z.object({
  name: z
    .string()
    .min(1, "Competency name is required")
    .max(100),

  description: z
    .string()
    .max(1000)
    .optional(),

  behavioralIndicators: z
    .string()
    .max(2000)
    .optional(),
});

export const updateCompetencySchema = z.object({
  name: z
    .string()
    .min(1, "Competency name is required")
    .max(100)
    .optional(),

  description: z
    .string()
    .max(1000)
    .optional(),

  behavioralIndicators: z
    .string()
    .max(2000)
    .optional(),
});