"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
// import slugify from "slugify";
import * as z from "zod";

import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/lib/validations";
export const CreateUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { firstName, lastName, number, email, auth } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(auth.password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: `User with this email (${email}) already exists!`,
    };
  }
  // const slugifiedUsername = slugify(firstName, {
  //   lower: true,
  //   strict: true,
  //   trim: true,
  // });

  const user = await db.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      // username: slugifiedUsername,
      hashedPassword,
      phoneNumber: number,
    },
  });

  //   TODO: Generate and send verification token

  //   const verificationToken = await generateVerificationToken(email);

  return {
    user,
    success: "User created successfully!",
  };
};

export const LoginByEmail = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return {
      error: "Invalid credentials",
    };
  }

  // let redirectTo;

  // if (callbackUrl) {
  //   redirectTo = callbackUrl;
  // } else {
  //   redirectTo = DEFAULT_LOGIN_REDIRECT;
  // }

  // if(!existingUser.emailVerified){
  //     const verificationToken = await generateVerificationToken(email);
  //     // TODO: Send verfication mail

  //     return {
  //         success: "Your 6 digits OTP Code has been sent to your mail"
  //     }
  // }

  // if(existingUser.isTwoFactorEnabled && existingUser.email){

  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    revalidatePath(callbackUrl!);
    return {
      success: "Successfully signed in!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
  }
};

export const OnboardingLogin = async (
  values: z.infer<typeof LoginSchema>,
  path?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return {
      error: "Invalid credentials",
    };
  }

  // let redirectTo;

  // if (callbackUrl) {
  //   redirectTo = callbackUrl;
  // } else {
  //   redirectTo = DEFAULT_LOGIN_REDIRECT;
  // }

  // if(!existingUser.emailVerified){
  //     const verificationToken = await generateVerificationToken(email);
  //     // TODO: Send verfication mail

  //     return {
  //         success: "Your 6 digits OTP Code has been sent to your mail"
  //     }
  // }

  // if(existingUser.isTwoFactorEnabled && existingUser.email){

  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    revalidatePath(path!);
    return {
      success: "Successfully signed in!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
  }
};

export const Logout = async () => {
  // Server stuffs
  await signOut();
};

// export async function findOrCreateUser(googleUser: any) {
//   return await db.user.upsert({
//     where: { email: googleUser.email },
//     update: {
//       name: googleUser.name,
//       image: googleUser.picture,
//     },
//     create: {
//       email: googleUser.email,
//       name: googleUser.name,
//       image: googleUser.picture,
//       username: googleUser?.username,
//     },
//   });
// }
