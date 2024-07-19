import CardIcon from "@/components/icons/card";
import SettingsIcon from "@/components/icons/settings";
import SupportIcon from "@/components/icons/support";
import UserIcon from "@/components/icons/user";

export const authMenuRoutes = [
  {
    name: "My account",
    href: "/dashboard",
    icon: <UserIcon />,
    dropdownItems: [
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: <UserIcon />,
      },
      {
        name: "Update Password",
        href: "/dashboard/profile",
        icon: <UserIcon />,
      },
    ],
  },
  {
    name: "Payments",
    href: "/dashboard/account/payments",
    icon: <CardIcon />,
    dropdownItems: [
      {
        name: "Billings",
        href: "/dashboard/account/billings",
        icon: <CardIcon />,
      },
    ],
  },
  {
    name: "Settings",
    href: "/dashboard/account/settings",
    icon: <SettingsIcon />,
    dropdownItems: [
      {
        name: "Billings",
        href: "/dashboard/account/billings",
        icon: <CardIcon />,
      },
    ],
  },
  {
    name: "Support",
    href: "/dashboard/account/settings",
    icon: <SupportIcon />,
    dropdownItems: [
      {
        name: "Billings",
        href: "/dashboard/account/billings",
        icon: <CardIcon />,
      },
    ],
  },
  // {
  //   name: "Support",
  //   href: "/dashboard/account/settings",
  //   icon: <SupportIcon />,
  //   dropdownItems: [
  //     {
  //       name: "Billings",
  //       href: "/dashboard/account/billings",
  //       icon: <CardIcon />,
  //     },
  //   ],
  // },
];
