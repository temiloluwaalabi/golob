"use client";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h1 className={cn("text-3xl font-semibold")}>🔐Auth</h1>
          <p className="text-sm text-muted-foreground">
            Oops! Something went wrong
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center justify-center">
          <AlertTriangle className="text-destructive" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
