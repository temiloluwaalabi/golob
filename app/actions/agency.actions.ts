"use server";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  GeneralPreOnboardingSchema,
  LoginSchema,
  RegisterSchema,
} from "@/lib/validations";
import { KycDocumentType } from "@prisma/client";
import * as z from "zod";

export const PreAgencyOnboardingAction = async (
  values: z.infer<typeof GeneralPreOnboardingSchema>
) => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return {
        error: "Unauthorized",
      };
    }
    const validatedFields = GeneralPreOnboardingSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid Fields",
      };
    }

    const {
      country,
      identificationNumber,
      identificationType,
      addressLineOne,
      addressLineTwo,
      docUrl,
      // dob,
      city,
      state,
      proofOfAddress,
      addressProofType,
      agencyEmail,
      agencyName,
      agencyUniquePrefix,
      natureOfBusiness,
      businessType,
      legalBusinessName,
      rcNumber,
    } = validatedFields.data;

    // const personalKycDocument = await db.kycDocument.create({
    //     data:{

    //     }
    // })

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        addressOne: addressLineOne,
        addressTwo: addressLineTwo,
        city,
        state,
        KycDocument: {
          create: {
            documentType: identificationType || "",
            documentNumber: identificationNumber,
            fileUrl: (docUrl && docUrl[0].url) || "",
            type: KycDocumentType.IDENTITY_PROOF,
          },
        },
        // dob,
      },
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        KycDocument: {
          create: {
            type: KycDocumentType.ADDRESS_PROOF,
            fileUrl: proofOfAddress && proofOfAddress[0].url,
            documentType: addressProofType,
          },
        },
      },
    });

    const agency = await db.agency.create({
      data: {
        name: agencyName || "",
        email: agencyEmail || "",
        prefix: agencyUniquePrefix || "",
        businessType: businessType || "",
        natureOfBusiness: natureOfBusiness || "",
        legalBusinessName: legalBusinessName || "",
        businessRegistrationNumber: rcNumber || "",
        agencyOwnerId: user.id,
      },
    });

    return {
      agency,
      success: "Agency created successfully, verification process begins",
    };
  } catch (error) {
    console.error("Error creating agency", error);
    throw new Error("Error creating agency");
  }
};

export const getAllAgencyPrefix = async () => {
  try {
    const prefixes = await db.agency.findMany({
      select: {
        prefix: true,
      },
    });

    console.log(prefixes);
    const prefix = prefixes.map((r) => r.prefix);

    return prefix;
  } catch (error) {
    console.error("Error fetching prefixe", error);
    throw new Error("Error fetching prefix");
  }
};
export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany();

    console.log(users);

    return users;
  } catch (error) {
    console.error("Error fetching prefixe", error);
    throw new Error("Error fetching prefix");
  }
};
