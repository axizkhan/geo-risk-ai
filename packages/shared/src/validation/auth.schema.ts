import * as z from "zod";

export const signupSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "password must be 8 character long")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[a-z]/, "One smallcase required")
    .regex(/[0-9]/, "One number required")
    .regex(/[^A-Za-z0-9]/, "One special Character is required"),
  name: z.object({
    firstName: z
      .string()
      .max(40, "firstname must be 40 character long")
      .regex(/^[A-Za-z ]+$/, "FirstName must be alphabate only"),
    lastName: z
      .string()
      .max(40, "Lastname must be 40 character long")
      .regex(/^[A-Za-z ]+$/, "Lastname must be alphabate only")
      .optional(),
  }),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "password must be 8 character long")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[a-z]/, "One smallcase required")
    .regex(/[0-9]/, "One number required")
    .regex(/[^A-Za-z0-9]/, "One special Character is required"),
});

export const verifySchema = z.object({
  verifyToken: z.string(),
});
