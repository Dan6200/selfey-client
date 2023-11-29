"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Nav() {
  const session = useSession();
  return (
    <nav className="w-full flex justify-between px-8 border-b h-fit py-4">
      <Link href="/">
        <h1 className="font-bold text-xl">Selfey</h1>
      </Link>
      <div className="w-fit flex space-x-8 flex-end justify-between">
        {session.status === "authenticated" ? (
          <>
            <h3 className="text-lg">
              Welcome{" "}
              <span className="italic text-blue-700">
                {(session as any)?.data?.apiResponse?.username}
              </span>
            </h3>
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
