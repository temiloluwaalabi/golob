// @flow
"use client";
import AirplaceIcon from "@/components/icons/airplane";
import StayIcon from "@/components/icons/stay";
import Link from "next/link";
import * as React from "react";
import Logo from "../logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FaviconArrowDown from "@/components/icons/favicon-arrow";
import { authRoutes } from "@/routes";
import { authMenuRoutes } from "@/config/routes";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import LogoutIcon from "@/components/icons/logout";
import FavoriteIcon from "@/components/icons/favorite";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types";
type Props = {
  className?: string;
  transparent?: boolean;
  user: User | null;
};
export const NavHeader = (props: Props) => {
  const [openAuthMenu, setOpenAuthMenu] = React.useState(false);
  const [openMobileAuthMenu, setOpenMobileAuthMenu] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = (index: number, open: boolean) => {
    setOpenIndex(open ? index : null);
  };
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth/login");
      // toast({
      //   description: "Logged out successfully!",
      // });
    } catch (error) {
      console.error(error);
    }
  };
  const routes = [
    {
      label: "Find Flight",
      route: "/flights",
      icon: <AirplaceIcon />,
    },
    {
      label: "Find Stays",
      route: "/stays",
      icon: <StayIcon />,
    },
  ];

  return (
    <nav
      className={cn(
        "px-[30px] md:px-[70px] lg:px-[104px] h-[90px] bg-white flex items-center justify-between ",
        props.className,
        props.transparent !== true && "shadow-md"
      )}
    >
      <div className=" items-center h-full gap-[32px] hidden lg:flex">
        {routes.map((route, id) => {
          const isActive =
            (pathname.includes(route.route) && route.route.length > 1) ||
            pathname === route.route;

          return (
            <p
              key={`${route} - ${id}`}
              className={cn(
                "flex  h-full items-center gap-2 hover:border-b-[5px] hover:border-b-primary",
                props.transparent && "text-white",
                isActive && "border-b-[5px] border-b-primary"
              )}
            >
              <>{route.icon}</>
              <Link href={route.route} className="text-14_medium font-semibold">
                {route.label}
              </Link>
            </p>
          );
        })}
      </div>
      <div>
        <Logo transparent={props.transparent} />
      </div>
      <div>
        <div className=" items-center gap-8 hidden lg:flex">
          {props.user?.id ? (
            <DropdownMenu open={openAuthMenu} onOpenChange={setOpenAuthMenu}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <FavoriteIcon
                    className={cn("", props.transparent && "text-white")}
                  />
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      props.transparent && "text-white"
                    )}
                  >
                    favourites
                  </span>
                </div>
                <Separator className="" orientation={"vertical"} />
                <DropdownMenuTrigger className="flex items-center gap-2 border-none outline-none ">
                  <div className="relative">
                    <Avatar
                      className={cn(
                        "!h-9  w-9 !z-10 sm:!h-12 sm:w-12 !border-primary-salmon border-1 cursor-pointer "
                      )}
                    >
                      {props.user.image && (
                        <AvatarImage
                          src={props.user?.image}
                          className="!z-10 cursor-pointer"
                        />
                      )}
                      <AvatarFallback className="!z-10">CN</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 z-10">
                      <FaviconArrowDown
                        className={cn(" size-4", openAuthMenu && "rotate-180")}
                      />
                    </div>
                  </div>
                  <h4
                    className={cn(
                      "font-bold text-sm",
                      props.transparent && "text-white"
                    )}
                  >
                    {props.user.name}
                  </h4>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent
                align={"end"}
                side={"bottom"}
                sideOffset={5}
                className="w-[329px] rounded-xl p-8"
              >
                <Card className="shadow-none outline-none border-none p-0">
                  <CardHeader className="p-0 !flex flex-row items-center gap-4">
                    <div className="">
                      <Avatar
                        className={cn(
                          "!h-12 w-12 sm:!h-16 sm:w-16 border-2 cursor-pointer border-gray-0 dark:border-gray-100"
                        )}
                      >
                        {props.user.image && (
                          <AvatarImage
                            src={props.user?.image}
                            className="!z-10 cursor-pointer"
                          />
                        )}{" "}
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-1">
                      <h2 className="font-mont font-semibold text-base">
                        {props.user.name}
                      </h2>
                      <p className="font-mont text-sm font-normal">Online</p>
                    </div>
                  </CardHeader>
                  <DropdownMenuSeparator className="my-4 bg-primary-blackishGreen opacity-25" />
                  <CardContent className="p-0">
                    {authMenuRoutes.slice(0, 3).map((route, id) => {
                      const pathnameExistsInDropdowns: any =
                        route.dropdownItems.filter(
                          (dropdownItem) => dropdownItem.href === pathname
                        );
                      const isOpen = openIndex === id;
                      const isDropdownOpen = Boolean(
                        pathnameExistsInDropdowns?.length
                      );
                      const isActive =
                        (pathname.includes(route.href) &&
                          route.href.length > 1) ||
                        pathname === route.href;
                      return (
                        <div key={route.href}>
                          {route.dropdownItems.length && (
                            <Collapsible
                              defaultOpen={isDropdownOpen}
                              open={isOpen}
                              onOpenChange={(newOpenState) =>
                                handleOpenChange(id, newOpenState)
                              }
                            >
                              <CollapsibleTrigger className="w-full">
                                <p
                                  key={`${route} - ${id}`}
                                  className={cn(
                                    "flex  h-full items-center w-full hover:bg-light-800 justify-between py-3 gap-2 mb-2 hover:px-2 hover:rounded-md",

                                    isActive && "text-primary "
                                  )}
                                >
                                  <div className="flex gap-2 items-center">
                                    <>{route.icon}</>
                                    <Link
                                      href={route.href}
                                      className="text-14_medium font-semibold"
                                    >
                                      {route.name}
                                    </Link>
                                  </div>
                                  <ChevronRight
                                    strokeWidth={3}
                                    className={cn(
                                      "size-4 ml-auto cursor-pointer p-0",
                                      isOpen && "rotate-90"
                                    )}
                                  />
                                </p>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="rounded-xl  px-2">
                                {route.dropdownItems.map((item, index) => {
                                  const isChildActive =
                                    pathname === (item.href as string);
                                  return (
                                    <div
                                      key={item.name + index}
                                      className="flex items-center gap-2"
                                    >
                                      <>{route.icon}</>
                                      <Link
                                        href={item.href}
                                        className={cn(
                                          "text-14_medium font-semibold flex  h-full items-center py-3 gap-2 ",
                                          isChildActive && "text-primary"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    </div>
                                  );
                                })}
                              </CollapsibleContent>
                            </Collapsible>
                          )}
                        </div>
                      );
                    })}
                    <DropdownMenuSeparator className="my-4 bg-primary-blackishGreen opacity-25" />
                    {authMenuRoutes.slice(3, 4).map((route, id) => {
                      const pathnameExistsInDropdowns: any =
                        route.dropdownItems.filter(
                          (dropdownItem) => dropdownItem.href === pathname
                        );
                      const isOpen = openIndex === id;
                      const isDropdownOpen = Boolean(
                        pathnameExistsInDropdowns?.length
                      );
                      const isActive =
                        (pathname.includes(route.href) &&
                          route.href.length > 1) ||
                        pathname === route.href;
                      return (
                        <div key={route.href}>
                          {route.dropdownItems.length && (
                            <Collapsible
                              defaultOpen={isDropdownOpen}
                              open={isOpen}
                              onOpenChange={(newOpenState) =>
                                handleOpenChange(id, newOpenState)
                              }
                            >
                              <CollapsibleTrigger className="w-full">
                                <p
                                  key={`${route} - ${id}`}
                                  className={cn(
                                    "flex  h-full items-center w-full hover:bg-light-800 justify-between py-3 gap-2 mb-2 hover:px-2 hover:rounded-md",

                                    isActive && "text-primary "
                                  )}
                                >
                                  <div className="flex gap-2 items-center">
                                    <>{route.icon}</>
                                    <Link
                                      href={route.href}
                                      className="text-14_medium font-semibold"
                                    >
                                      {route.name}
                                    </Link>
                                  </div>
                                  <ChevronRight
                                    strokeWidth={3}
                                    className={cn(
                                      "size-4 ml-auto cursor-pointer p-0",
                                      isOpen && "rotate-90"
                                    )}
                                  />
                                </p>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="rounded-xl  px-2">
                                {route.dropdownItems.map((item, index) => {
                                  const isChildActive =
                                    pathname === (item.href as string);
                                  return (
                                    <div
                                      key={item.name + index}
                                      className="flex items-center gap-2"
                                    >
                                      <>{route.icon}</>
                                      <Link
                                        href={item.href}
                                        className={cn(
                                          "text-14_medium font-semibold flex  h-full items-center py-3 gap-2 ",
                                          isChildActive && "text-primary"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    </div>
                                  );
                                })}
                              </CollapsibleContent>
                            </Collapsible>
                          )}
                        </div>
                      );
                    })}
                    <Button
                      variant={"ghost"}
                      onClick={handleSignOut}
                      className="p-0 w-full hover:bg-red-600 hover:text-white hover:px-2 flex items-center justify-start"
                    >
                      <LogoutIcon className="mr-2 size-4" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant={"link"}
                asChild
                className={cn("", props.transparent && "text-white")}
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                className={cn(
                  "h-[48px] w-[104px] px-[24px] py-[16px] rounded-[8px] bg-primary-blackishGreen hover:bg-primary-salmon",
                  props.transparent && "bg-white text-primary-blackishGreen"
                )}
                asChild
              >
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet>
          <div className="flex gap-2 items-center flex-row-reverse">
            <SheetTrigger asChild>
              <Menu
                className={cn(
                  "cursor-pointer flex lg:hidden",
                  props.transparent && "text-white"
                )}
              />
            </SheetTrigger>
            {props.user?.id && (
              <DropdownMenu
                open={openMobileAuthMenu}
                onOpenChange={setOpenMobileAuthMenu}
              >
                <DropdownMenuTrigger
                  asChild
                  className="cursor-pointer flex lg:hidden"
                >
                  <div className="relative">
                    <Avatar
                      className={cn(
                        "!h-9  w-9 !z-10 sm:!h-12 sm:w-12 !border-primary-salmon border-1 cursor-pointer "
                      )}
                    >
                      {props.user.image && (
                        <AvatarImage
                          src={props.user?.image}
                          className="!z-10 cursor-pointer"
                        />
                      )}
                      <AvatarFallback className="!z-10">CN</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 z-10">
                      <FaviconArrowDown
                        className={cn(" size-4", openAuthMenu && "rotate-180")}
                      />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align={"end"}
                  side={"bottom"}
                  sideOffset={5}
                  className="w-[329px] rounded-xl p-8"
                >
                  <Card className="shadow-none outline-none border-none p-0">
                    <CardHeader className="p-0 !flex flex-row items-center gap-4">
                      <div className="">
                        <Avatar
                          className={cn(
                            "!h-12 w-12 sm:!h-16 sm:w-16 border-2 cursor-pointer border-gray-0 dark:border-gray-100"
                          )}
                        >
                          {props.user.image && (
                            <AvatarImage
                              src={props.user?.image}
                              className="!z-10 cursor-pointer"
                            />
                          )}{" "}
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-mont font-semibold text-base">
                          {props.user.name}
                        </h2>
                        <p className="font-mont text-sm font-normal">Online</p>
                      </div>
                    </CardHeader>
                    <DropdownMenuSeparator className="my-4 bg-primary-blackishGreen opacity-25" />
                    <CardContent className="p-0">
                      {authMenuRoutes.slice(0, 3).map((route, id) => {
                        const pathnameExistsInDropdowns: any =
                          route.dropdownItems.filter(
                            (dropdownItem) => dropdownItem.href === pathname
                          );
                        const isOpen = openIndex === id;
                        const isDropdownOpen = Boolean(
                          pathnameExistsInDropdowns?.length
                        );
                        const isActive =
                          (pathname.includes(route.href) &&
                            route.href.length > 1) ||
                          pathname === route.href;
                        return (
                          <div key={route.href}>
                            {route.dropdownItems.length && (
                              <Collapsible
                                defaultOpen={isDropdownOpen}
                                open={isOpen}
                                onOpenChange={(newOpenState) =>
                                  handleOpenChange(id, newOpenState)
                                }
                              >
                                <CollapsibleTrigger className="w-full">
                                  <p
                                    key={`${route} - ${id}`}
                                    className={cn(
                                      "flex  h-full items-center w-full hover:bg-light-800 justify-between py-3 gap-2 mb-2 hover:px-2 hover:rounded-md",

                                      isActive && "text-primary "
                                    )}
                                  >
                                    <div className="flex gap-2 items-center">
                                      <>{route.icon}</>
                                      <Link
                                        href={route.href}
                                        className="text-14_medium font-semibold"
                                      >
                                        {route.name}
                                      </Link>
                                    </div>
                                    <ChevronRight
                                      strokeWidth={3}
                                      className={cn(
                                        "size-4 ml-auto cursor-pointer p-0",
                                        isOpen && "rotate-90"
                                      )}
                                    />
                                  </p>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="rounded-xl  px-2">
                                  {route.dropdownItems.map((item, index) => {
                                    const isChildActive =
                                      pathname === (item.href as string);
                                    return (
                                      <div
                                        key={item.name + index}
                                        className="flex items-center gap-2"
                                      >
                                        <>{route.icon}</>
                                        <Link
                                          href={item.href}
                                          className={cn(
                                            "text-14_medium font-semibold flex  h-full items-center py-3 gap-2 ",
                                            isChildActive && "text-primary"
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </CollapsibleContent>
                              </Collapsible>
                            )}
                          </div>
                        );
                      })}
                      <DropdownMenuSeparator className="my-4 bg-primary-blackishGreen opacity-25" />
                      {authMenuRoutes.slice(3, 4).map((route, id) => {
                        const pathnameExistsInDropdowns: any =
                          route.dropdownItems.filter(
                            (dropdownItem) => dropdownItem.href === pathname
                          );
                        const isOpen = openIndex === id;
                        const isDropdownOpen = Boolean(
                          pathnameExistsInDropdowns?.length
                        );
                        const isActive =
                          (pathname.includes(route.href) &&
                            route.href.length > 1) ||
                          pathname === route.href;
                        return (
                          <div key={route.href}>
                            {route.dropdownItems.length && (
                              <Collapsible
                                defaultOpen={isDropdownOpen}
                                open={isOpen}
                                onOpenChange={(newOpenState) =>
                                  handleOpenChange(id, newOpenState)
                                }
                              >
                                <CollapsibleTrigger className="w-full">
                                  <p
                                    key={`${route} - ${id}`}
                                    className={cn(
                                      "flex  h-full items-center w-full hover:bg-light-800 justify-between py-3 gap-2 mb-2 hover:px-2 hover:rounded-md",

                                      isActive && "text-primary "
                                    )}
                                  >
                                    <div className="flex gap-2 items-center">
                                      <>{route.icon}</>
                                      <Link
                                        href={route.href}
                                        className="text-14_medium font-semibold"
                                      >
                                        {route.name}
                                      </Link>
                                    </div>
                                    <ChevronRight
                                      strokeWidth={3}
                                      className={cn(
                                        "size-4 ml-auto cursor-pointer p-0",
                                        isOpen && "rotate-90"
                                      )}
                                    />
                                  </p>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="rounded-xl  px-2">
                                  {route.dropdownItems.map((item, index) => {
                                    const isChildActive =
                                      pathname === (item.href as string);
                                    return (
                                      <div
                                        key={item.name + index}
                                        className="flex items-center gap-2"
                                      >
                                        <>{route.icon}</>
                                        <Link
                                          href={item.href}
                                          className={cn(
                                            "text-14_medium font-semibold flex  h-full items-center py-3 gap-2 ",
                                            isChildActive && "text-primary"
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </CollapsibleContent>
                              </Collapsible>
                            )}
                          </div>
                        );
                      })}
                      <Button
                        variant={"ghost"}
                        onClick={handleSignOut}
                        className="p-0 w-full hover:bg-red-600 hover:text-white hover:px-2 flex items-center justify-start"
                      >
                        <LogoutIcon className="mr-2 size-4" />
                        Logout
                      </Button>
                    </CardContent>
                  </Card>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <SheetContent>
            <div className="flex flex-col gap-2">
              {routes.map((route, id) => {
                const isActive =
                  (pathname.includes(route.route) && route.route.length > 1) ||
                  pathname === route.route;

                return (
                  <p
                    key={`${route} - ${id}`}
                    className={cn(
                      "flex  h-full items-center py-3 gap-2 hover:border-b-[5px] ",

                      isActive && "border-b-[5px] "
                    )}
                  >
                    <>{route.icon}</>
                    <Link
                      href={route.route}
                      className="text-14_medium font-semibold"
                    >
                      {route.label}
                    </Link>
                  </p>
                );
              })}
            </div>
            <div className="">
              {props.user?.id ? (
                <div className="flex flex-col gap-2">
                  {authMenuRoutes.map((route, id) => {
                    const isActive =
                      (pathname.includes(route.href) &&
                        route.href.length > 1) ||
                      pathname === route.href;

                    return (
                      <p
                        key={`${route} - ${id}`}
                        className={cn(
                          "flex  h-full items-center py-3 gap-2 hover:border-b-[5px] ",

                          isActive && "border-b-[5px]"
                        )}
                      >
                        <>{route.icon}</>
                        <Link
                          href={route.href}
                          className="text-14_medium font-semibold"
                        >
                          {route.name}
                        </Link>
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="gap-3 mt-4 flex items-center justify-end flex-row-reverse">
                  <Button variant={"link"} asChild className={cn("")}>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button
                    className={cn(
                      "h-[48px] w-[104px] px-[24px] py-[16px] rounded-[8px] bg-primary-blackishGreen hover:bg-primary-salmon"
                    )}
                    asChild
                  >
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
