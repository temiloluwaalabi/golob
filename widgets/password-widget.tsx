"use client";
import EyeIcon from "@/components/icons/eye";
import EyeOffIcon from "@/components/icons/eye-off";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CustomPasswordInputProps {
  isPending?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  field: any;
  label: string;
  placeholder?: string;
}

const CustomPasswordInput = ({
  isPending,
  field,
  label,
  placeholder,
  labelClassName,
  inputClassName,
}: CustomPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex gap-1 items-center p-0 relative w-full bg-transparent pr-[10px] h-[56px] border rounded-md ">
      <Label
        className={cn(
          "absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1",
          labelClassName
        )}
      >
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
        className="p-0 w-fit h-fit hover:bg-transparent absolute right-0 -translate-x-3 top-1/2 -translate-y-1/2"
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
