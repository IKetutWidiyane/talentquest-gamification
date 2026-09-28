import { z } from "zod";

export const updateCandidateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),

  lastName: z.string().max(100).optional(),

  phone: z.string().max(30).optional(),

  address: z.string().max(255).optional(),

  city: z.string().max(100).optional(),

  province: z.string().max(100).optional(),

  birthDate: z
    .string()
    .datetime()
    .nullable()
    .optional(),

  education: z.string().max(255).optional(),

  experience: z.string().max(2000).optional(),

  skills: z.string().max(2000).optional(),

  resumeUrl: z
    .string()
    .url()
    .nullable()
    .optional(),

  profilePhotoUrl: z
    .string()
    .url()
    .nullable()
    .optional(),
});