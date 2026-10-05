import { z } from "zod";

export const createTalentPoolSchema = z.object({
  candidateProfileId: z.string().min(1),
  status: z
    .enum(["ACTIVE", "HIRED", "INACTIVE"])
    .optional(),
  notes: z.string().max(5000).optional(),
  tags: z.string().max(1000).optional(),
});

export const updateTalentPoolSchema = z.object({
  status: z
    .enum(["ACTIVE", "HIRED", "INACTIVE"])
    .optional(),
  notes: z.string().max(5000).optional(),
  tags: z.string().max(1000).optional(),
});