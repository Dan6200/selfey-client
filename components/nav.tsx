import Link from "next/link";
import { Button } from "./ui/button";
import { userAtom } from "./atoms";

export default function Nav() {
  const isSignedIn = true;
  return (
    <nav className="w-full border-red-800 flex justify-between px-8 border-b-foreground border-b-[1pt] py-4">
      <Link href="/">
        <h1 className="font-bold text-xl">Selfey</h1>
      </Link>
      <div className="w-fit flex space-x-8 flex-end justify-between">
        {isSignedIn ? (
          <>
            <Link href="/">
              <Button>Browse</Button>
            </Link>
            <Link href="/add-post">
              <Button>Add Post</Button>
            </Link>
          </>
        ) : (
          <Link href={process.env.NEXT_PUBLIC_API + "/accounts/login"}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
