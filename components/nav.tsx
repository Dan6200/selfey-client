"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Nav() {
  const { data: userData } = useSession();
  console.log("user session data", userData);
  return (
    <nav className="w-full border-red-800 flex justify-between px-8 border-b-foreground border-b-[1pt] py-4">
      <Link href="/">
        <h1 className="font-bold text-xl">Selfey</h1>
      </Link>
      <div className="w-fit flex space-x-8 flex-end justify-between">
        {userData ? (
          <>
            <Link href="/">
              <Button>Browse</Button>
            </Link>
            <Link href="/add-post">
              <Button>Add Post</Button>
            </Link>
            <Link href="/logout">
              <Button onClick={() => signOut()}>Sign Out</Button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
