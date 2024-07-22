import * as z from "zod";
import {
  addressSchema,
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
  docUrl: z.string(),
  dob: z.date().optional(),
});

export const AgencyIdentityAddressProof = z.object({
  addressLineOne: z.string(),
  addressLineTwo: z.string(),
  city: z.string(),
  state: z.string(),
  proofOfAddress: z.string(),
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
