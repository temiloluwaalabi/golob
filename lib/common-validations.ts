import { messages } from "@/config/messages";
import * as z from "zod";
export const FileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
  key: z.optional(z.string()),
});
export const OTPSchema = z.object({
  otp: z.coerce
    .number()
    .min(1, {
      message: "Minimum of 1 number is required",
    })
    .max(6, {
      message: "maximum of 6 characters is required",
    }),
});
export const ValidateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invliadEmail });
export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(1, {
    message: messages.passwordLengthMin,
  })
  .regex(/.*[A-Z].*/, {
    message: messages.passwordOneUppercase,
  })
  .regex(/.*[a-z].*/, {
    message: messages.passwordOneLowercase,
  })
  .regex(/.*\d.*/, {
    message: messages.passwordOneNumeric,
  });
export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(new RegExp(".*[A-Z].*"), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp(".*[a-z].*"), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp(".*\\d.*"), {
    message: messages.passwordOneNumeric,
  });
export const SetupPasswordCSchema = z
  .object({
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine(
    (data) => {
      if (data.password && !data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.confirmPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmPassword"], // Correct path for the confirmedPassword field
  });
export const addressSchema = z.object({
  address: z.string().min(1, {
    message: "Address is required",
  }),
  country: z.string().min(1, {
    message: "Address country is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
});
