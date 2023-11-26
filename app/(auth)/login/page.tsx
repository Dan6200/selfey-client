"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <section className="flex flex-col items-center space-y-12">
      <Card className="w-[90%] md:w-[50%] mb-16 p-8">
        <CardHeader className="flex items-center flex-col">
          <h1 className="text-3xl capitalize">
            <span className="text-2xl">Welcome to </span>{" "}
            <span className="font-bold">Selfey</span>
          </h1>
          <Image
            className="w-[20%] mx-auto"
            src="/logo_google_icon.svg"
            alt="google icon"
            width={600}
            height={600}
          />
        </CardHeader>
        <CardFooter className="flex items-center">
          <Button
            className="capitalize mx-auto"
            onClick={() => signIn("google")}
          >
            Sign In with your google account
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
