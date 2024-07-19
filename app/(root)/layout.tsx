import { Footer } from "@/components/shared/footer/footer";
import { NavHeader } from "@/components/shared/header/main-header";
import { currentUser } from "@/lib/auth";
import { User } from "@/types";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User | null = await currentUser();
  return (
    <section className="h-screen">
      <NavHeader user={user} className="" />
      {/* <MainHero /> */}
      <section>{children}</section>
      <Footer />
    </section>
  );
}
