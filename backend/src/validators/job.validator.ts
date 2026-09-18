import { z } from "zod";
import {
  EmploymentType,
  JobStatus,
} from "@prisma/client";

export const createJobSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(150)
    .trim(),

  department: z
    .string()
    .min(1, "Department is required")
    .max(100)
    .trim(),

  location: z
    .string()
    .min(1, "Location is required")
    .max(150)
    .trim(),

  employmentType: z.nativeEnum(EmploymentType),

  experience: z
    .string()
    .max(150)
    .trim()
    .optional(),

  description: z
    .string()
    .min(1, "Description is required"),

  responsibilities: z
    .array(z.string().min(1))
    .min(1, "At least one responsibility is required"),

  requirements: z
    .array(z.string().min(1))
    .min(1, "At least one requirement is required"),

  status: z
    .nativeEnum(JobStatus)
    .optional()
    .default(JobStatus.DRAFT),

  competencyIds: z
    .array(z.string().uuid())
    .optional()
    .default([]),
});

export const updateJobSchema = createJobSchema.partial();

export const updateJobStatusSchema = z.object({
  status: z.nativeEnum(JobStatus),
});