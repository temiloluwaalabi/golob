"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  transparent?: boolean;
}
const Logo = ({ className, transparent }: LogoProps) => {
  const router = useRouter();
  return (
    <Image
      src={
        transparent
          ? "https://res.cloudinary.com/demw7uh0v/image/upload/v1720298155/golobe/tranlogo_zwooxy.png"
          : "https://res.cloudinary.com/demw7uh0v/image/upload/v1720189706/golobe/blackLogo_keipxb.png"
      }
      width={111}
      height={36}
      alt="Logo"
      className={cn("cursor-pointer object-cover", className)}
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
