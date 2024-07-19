"use client";
import EyeIcon from "@/components/icons/eye";
import EyeOffIcon from "@/components/icons/eye-off";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CustomPasswordInputProps {
  isPending?: boolean;
  field: any;
  label: string;
  placeholder?: string;
}

const CustomPasswordInput = ({
  isPending,
  field,
  label,
  placeholder,
}: CustomPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex gap-1 items-center p-0 relative bg-white pr-[10px] h-[56px] border rounded-md ">
      <Label className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1">
        {label}
      </Label>
      <Input
        disabled={isPending}
        placeholder={placeholder ? placeholder : "Enter your password"}
        type={showPassword ? "text" : "password"}
        className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        {...field}
      />
      <Button
        variant={"ghost"}
        type="button"
        size={"icon"}
        className="p-0 w-fit hover:bg-transparent absolute right-0 -translate-x-3 top-0 h-full"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={isPending}
      >
        {showPassword ? (
          <EyeIcon className="size-4 dark:text-light-500" aria-hidden />
        ) : (
          <EyeOffIcon className="size-4 dark:text-light-500" aria-hidden />
        )}
        {/* <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span> */}
      </Button>
    </div>
  );
};

export default CustomPasswordInput;
