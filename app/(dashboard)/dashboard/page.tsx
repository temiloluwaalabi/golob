import React from "react";

import { MainDashboard } from "@/components/dashboards/user/main-dasboard";
import { currentUser } from "@/lib/auth";
import { User } from "@/types";

const Dashboard = async () => {
  const user: User | null = await currentUser();
  // const ud = await getAllUsers();
  return <MainDashboard dbUser={user} />;
};

export default Dashboard;
