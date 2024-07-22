"use client";

import { getUserByID } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUserAtom } from "@/store/authStore";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

interface CurrentUserProviderProps {
  children: React.ReactNode;
}
export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const user = useCurrentUser();
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    const getUser = async () => {
      if (user?.id) {
        try {
          const clientUser = await getUserByID(user?.id);
          setCurrentUser(clientUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    getUser();
  }, [setCurrentUser, user?.id]);

  return <>{children}</>;
};
