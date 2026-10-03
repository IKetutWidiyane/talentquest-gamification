import { z } from "zod";

export const createChallengeSchema = z.object({
  assessmentId: z.string().min(1),
  competencyId: z.string().min(1),
  name: z.string().min(1).max(255),
  scenario: z.string().min(1).max(5000),
  question: z.string().min(1).max(2000),
  order: z.number().int().min(1),
  weight: z.number().min(0).optional(),
});

export const updateChallengeSchema = z.object({
  competencyId: z.string().min(1).optional(),
  name: z.string().min(1).max(255).optional(),
  scenario: z.string().min(1).max(5000).optional(),
  question: z.string().min(1).max(2000).optional(),
  order: z.number().int().min(1).optional(),
  weight: z.number().min(0).optional(),
});

export const createChallengeOptionSchema = z.object({
  label: z.string().min(1).max(255),
  value: z.string().min(1).max(255),
  score: z.number().min(0),
  behavioralIndicator: z.string().max(2000).optional(),
});

export const updateChallengeOptionSchema = z.object({
  label: z.string().min(1).max(255).optional(),
  value: z.string().min(1).max(255).optional(),
  score: z.number().min(0).optional(),
  behavioralIndicator: z.string().max(2000).optional(),
});