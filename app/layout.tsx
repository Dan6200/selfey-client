import Nav from "@/components/nav";
import type { Metadata } from "next";
import NextAuthProvider from "./auth/next-auth-provider";
import { Inter } from "next/font/google";
import "./globals.css";

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
          <main className="flex min-h-screen flex-col space-y-24">
            <Nav />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
