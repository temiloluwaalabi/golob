"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";
import EyeIcon from "../icons/eye";
import EyeOffIcon from "../icons/eye-off";
import CustomPasswordInput from "@/widgets/password-widget";
import { Label } from "../ui/label";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { LoginByEmail } from "@/app/actions/user.actions";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { TriangleAlertIcon } from "lucide-react";
import { getAccountByUserId, getUserByEmail } from "@/data/user";
import { User } from "@prisma/client";
import AccountModal from "../cards/account-modal";
import { useCurrentAuthStore } from "@/store/authStore";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null | undefined>();
  // const [showAccoumtForm, setShowAccoumtForm] = useState(false);
  const { showAccountForm, setShowAccountForm } = useCurrentAuthStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT;
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      const emailUser = await getUserByEmail(values.email);
      const accountExists = await getAccountByUserId(emailUser?.id as string);
      if (accountExists) {
        setUser(emailUser);
        setShowAccountForm(true);
        return;
      }
      LoginByEmail(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);

            // toast({
            //   title: "Error logging in",
            //   description: data.error,
            //   variant: "destructive",
            // });
          }
          if (data?.success) {
            toast({
              title: "Logged In Successfully",
              description: data?.success,
            });
            router.push(callbackUrl);
            router.refresh();
            form.reset();
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        });
    });
  };
  return (
    <>
      {showAccountForm && user ? (
        <AccountModal userId={user?.id} email={user?.email} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-1 items-center p-0 relative bg-white pr-[10px] h-[56px] border rounded-md ">
                      <FormLabel className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your Email"
                          type="email"
                          className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <FormField
                  name="rememberMe"
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
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button variant={"link"} disabled={isPending}>
                  <Link
                    href="/auth/forgot-password"
                    className="text-14_medium text-primary-salmon"
                  >
                    Forgot Password
                  </Link>
                </Button>
              </div>
              <div className="space-y-6 my-[14px] flex flex-col items-center w-full">
                {error && (
                  <div className="bg-red-100 w-full rounded-md p-2 flex items-center gap-2">
                    <TriangleAlertIcon className="size-5 text-red-600" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <Button
                  disabled={isPending}
                  className="w-full h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen"
                >
                  {isPending ? "Logging...." : "Sign In"}
                </Button>
                <p className="flex gap-1 text-center items-center text-14_medium text-primary-blackishGreen">
                  <span>Don&apos;t have an account?</span>{" "}
                  <Button asChild variant={"ghost"} disabled={isPending}>
                    <Link href="/auth/sign-up" className="text-primary-salmon">
                      Sign up
                    </Link>
                  </Button>
                </p>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
