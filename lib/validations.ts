import * as z from "zod";
import {
  addressSchema,
  FileSchema,
  SetupPasswordCSchema,
  ValidateEmail,
  validatePassword,
} from "./common-validations";
import { messages } from "@/config/messages";

export const LoginSchema = z.object({
  email: ValidateEmail,
  password: validatePassword,
  rememberMe: z.boolean().default(false),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: messages.firstNameRequired,
  }),
  lastName: z.string().min(1, {
    message: messages.lastNameRequired,
  }),
  email: ValidateEmail,
  number: z.string().min(1, {
    message: messages.phoneNumber,
  }),
  auth: SetupPasswordCSchema,
  terms: z.boolean().default(false),
});

export const AgencyIdentityVerificationSchema = z.object({
  firstName: z.string().min(1, {
    message: messages.firstNameRequired,
  }),
  lastName: z.string().min(1, {
    message: messages.lastNameRequired,
  }),
  email: ValidateEmail,
  number: z.string().min(1, {
    message: messages.phoneNumber,
  }),
  auth: SetupPasswordCSchema,
  terms: z.boolean().default(false),
});

export const AgencyIdentityKYCSchema = z.object({
  country: z.string(),
  identificationType: z.string(),
  address: z.optional(addressSchema),
  identificationNumber: z.string(),
  docUrl: z.array(FileSchema),
  dob: z.date().optional(),
});

export const AgencyIdentityAddressProof = z.object({
  addressLineOne: z.string(),
  addressLineTwo: z.string(),
  city: z.string(),
  state: z.string(),
  addressProofType: z.string(),
  proofOfAddress: z.array(FileSchema),
});

export const AgencyEssentialDetailsSchema = z.object({
  agencyName: z.string(),
  agencyEmail: z.string(),
  agencyUniquePrefix: z.string(),
  natureOfBusiness: z.string(),
  businessType: z.string(),
  legalBusinessName: z.string().optional(),
  rcNumber: z.optional(z.string()),
});

export const GeneralPreOnboardingSchema = z.object({
  country: z.string().optional(),
  identificationType: z.string().optional(),
  address: z.optional(addressSchema),
  identificationNumber: z.string().optional(),
  docUrl: z.array(FileSchema).optional(),
  dob: z.date().optional(),
  addressLineOne: z.string().optional(),
  addressLineTwo: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  addressProofType: z.string(),

  proofOfAddress: z.array(FileSchema).optional(),
  agencyName: z.string().optional(),
  agencyEmail: z.string().optional(),
  agencyUniquePrefix: z.string().optional(),
  natureOfBusiness: z.string().optional(),
  businessType: z.string().optional(),
  legalBusinessName: z.string().optional(),
  rcNumber: z.optional(z.string()),
});
export const EmailSchema = z.object({
  email: ValidateEmail,
});

export const VerifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: "Mininum of 1 character",
    })
    .max(8, {
      message: "Maximum of 8 characters",
    }),
});

export const DebitCardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Minimum of 16 characters" })
    .max(16, { message: "Maximum of 16 characters" })
    .regex(/^\d+$/, { message: "Card number must contain only digits" }),
  expiryDate: z
    .string()
    .min(5, { message: "Expiry date must be exactly 5 characters" })
    .max(5, { message: "Expiry date must be exactly 5 characters" })
    .regex(/^\d{2}\/\d{2}$/, { message: "Invalid expiry date format" })
    .refine(
      (date) => {
        const [month, year] = date.split("/").map(Number);
        return month >= 1 && month <= 12 && year >= 0 && year <= 99;
      },
      { message: "Invalid expiry date" }
    ),
  cvv: z
    .string()
    .min(3, { message: "Minimum of 3 characters" })
    .max(4, { message: "Maximum of 4 characters" })
    .regex(/^\d+$/, { message: "CVV must contain only digits" }),
  name: z
    .string()
    .min(1, { message: "Minimum of 1 character" })
    .max(50, { message: "Maximum of 50 characters" }),
  country: z.string(),
  saveInfo: z.boolean().default(false),
});

export const FligthSearchSchema = z.object({
  takeOff: z.string(),
  destination: z.string(),
  tripType: z.string(),
  departureDate: z.date(),
  arrivalDate: z.date().optional(),
  passengers: z.object({
    adults: z.number(),
    teenagers: z.number(),
    infants: z.number(),
    class: z.string(),
  }),
});

export const HotelSearchSchema = z.object({
  destination: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.object({
    rooms: z.number(),
    adults: z.number(),
    teenagers: z.number(),
    infants: z.number(),
  }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  bio: z.optional(z.string()),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z.string().url("Invalid image URL").optional(),
  }),
});
export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }).optional(),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  type: z.string().min(1, { message: "account type is required" }),
});
