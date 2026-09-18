import { z } from "zod";

export const startAssessmentSchema = z.object({
  assessmentId: z
    .string()
    .min(1, "Assessment ID is required"),

  applicationId: z
    .string()
    .min(1, "Application ID is required"),
});

export const submitResponseSchema = z.object({
  challengeId: z
    .string()
    .min(1, "Challenge ID is required"),

  optionId: z
    .string()
    .min(1, "Option ID is required"),
});