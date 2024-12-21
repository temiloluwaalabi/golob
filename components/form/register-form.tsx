"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CreateUser } from "@/app/actions/user.actions";
import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/lib/validations";
import CustomPasswordInput from "@/widgets/password-widget";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const RegisterForm = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      CreateUser(values).then((data) => {
        if (data.error) {
          toast({
            title: "Error creating account",
            description: data.error,
            variant: "destructive",
          });
        }

        if (data.success) {
          toast({
            title: "User Registered Successfully",
            description: data.success,
          });

          form.reset();
          router.push("/auth/login");
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your firstname"
                          type="text"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your lastname"
                          type="text"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your email"
                          type="text"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="number"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your phonenumber"
                          type="text"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="auth.password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomPasswordInput
                        field={field}
                        label="Password"
                        isPending={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 mmd:col-span-6">
              <FormField
                name="auth.confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomPasswordInput
                        field={field}
                        label="Confirm Password"
                        isPending={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <FormField
              name="terms"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-1 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememeberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="rememberMe"
                    className="text-14_medium text-primary-blackishGreen"
                  >
                    I agree to all the{" "}
                    <Link
                      className="text-14_large text-primary-salmon"
                      href="/terms"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      className="text-14_large text-primary-salmon"
                      href="/terms"
                    >
                      Privacy Policies
                    </Link>
                  </FormLabel>
                </FormItem>
              )}
            />
            {/* <Link
              href="/auth/forgot-password"
              className="text-14_medium text-primary-salmon"
            >
              Forgot Password
            </Link> */}
          </div>
          <div className="my-[14px] flex flex-col items-center space-y-6">
            <Button
              disabled={isPending}
              className="h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white"
            >
              <Loader
                className={cn(
                  "animate-spin size-4 me-2 hidden",
                  isPending && "flex"
                )}
              />
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
            <p className="text-14_medium flex items-center gap-1 text-center text-primary-blackishGreen">
              <span>Already have an account</span>{" "}
              <Link href="/auth/login" className="text-primary-salmon">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
