import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be less than 255 characters"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be at least 6 characters")
    .max(6, "OTP must be exactly 6 characters")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type EmailInput = z.infer<typeof emailSchema>;
export type OTPInput = z.infer<typeof otpSchema>;
