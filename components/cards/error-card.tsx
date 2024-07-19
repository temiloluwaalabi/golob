"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-3xl font-semibold")}>🔐Auth</h1>
          <p className="text-muted-foreground text-sm">
            Oops! Something went wrong
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-center items-center">
          <AlertTriangle className="text-destructive" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
