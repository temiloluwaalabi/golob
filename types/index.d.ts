import { UserStaus } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  secondEmail?: string | null;
  image?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  dob?: Date | null;
  emailVerified?: string | Date | null;
  hashedPassword?: string | null;
  terms?: boolean | null;
  //   accounts: Account[];
  //   sessions: Session[];
  //   twoFactorConfirmation?: TwoFactorConfirmation;
  // authenticators: Authenticator[];
  role: UserRole; // Make sure you have a UserRole enum defined
  isTwoFactorEnabled: boolean;
  userStatus: UserStaus; // Make sure you have a UserStaus enum defined
  accountVerified: boolean;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  // affiliates: Affiliate[];
}
