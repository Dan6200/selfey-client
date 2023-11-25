"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default function Logout() {
  return (
    <section className="flex flex-col items-center space-y-12">
      <Card className="w-[90%] sm:w-[60%] mb-16 p-8">
        <CardHeader className="flex items-center flex-col">
          <p className="text-2xl capitalize">Sorry to see you go 😢</p>
        </CardHeader>
        <CardFooter className="flex items-center">
          <Button className="capitalize mx-auto">Sign out</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
