import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase().trim()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100)
    .trim(),

  lastName: z
    .string()
    .max(100)
    .trim()
    .optional(),

  phone: z
    .string()
    .max(30)
    .trim()
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase().trim()),

  password: z
    .string()
    .min(1, "Password is required"),
});