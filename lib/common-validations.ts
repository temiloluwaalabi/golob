import { messages } from "@/config/messages";
import * as z from "zod";

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
