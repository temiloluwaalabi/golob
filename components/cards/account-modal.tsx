"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Account, User } from "@prisma/client";
import { getAccountByUserId, getUserByEmail } from "@/data/user";
import { AccountModalForm } from "../form/account-modal-form";

interface AccountModalProps {
  userId: string;
  email: string;
}

const AccountModal = ({ userId, email }: AccountModalProps) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [account, setAccount] = useState<Account | null | undefined>();

  useEffect(() => {
    // Fetch user data when the component mounts or when formData.email changes
    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(email as string);
        const accountData = await getAccountByUserId(userData?.id as string);
        setUser(userData); // Update user state with fetched data
        setAccount(accountData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Set user state to null if there's an error
      }
    };

    if (userId) {
      fetchUser(); // Call fetchUser if formData.email exists
    }
  }, [email, userId]); // Trigger useEffect when formData.email changes
  return (
    <>
      <Card className="">
        <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
          <CardTitle className="text-base text-ellipsis font-bold text-center">
            Welcome Back, {user ? user.name : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 pb-3">
          <AccountModalForm user={user} account={account} />
        </CardContent>
      </Card>
    </>
  );
};

export default AccountModal;
