import { MainDashboard } from "@/components/dashboards/user/main-dasboard";
import { currentUser } from "@/lib/auth";
import { User } from "@/types";
import React from "react";

const Dashboard = async () => {
  const user: User | null = await currentUser();
  return <MainDashboard dbUser={user} />;
};

export default Dashboard;
