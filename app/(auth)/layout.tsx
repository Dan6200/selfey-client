import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../globals.css";
import NextAuthProvider from "./next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Selfey",
  description: "An app to post your selfies and view friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <main className="flex min-h-screen flex-col items-center space-y-24">
            <nav className="w-full border-red-800 flex justify-between px-8 border-b-foreground border-b-[1pt] py-4">
              <Link href="/">
                <h1 className="font-bold text-xl">Selfey</h1>
              </Link>
            </nav>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
