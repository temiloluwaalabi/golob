import React from "react";

import { NavHeader } from "@/components/shared/header/main-header";
import { currentUser } from "@/lib/auth";
import { User } from "@/types";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User | null = await currentUser();
  return (
    <>
      <NavHeader user={user} className="" />
      {children}
    </>
  );
}
