import Nav from "@/components/nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JotaiProvider from "../(auth)/jotai-provider";
import NextAuthProvider from "../(auth)/next-auth-provider";
import "../globals.css";

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
          <JotaiProvider>
            <main className="relative flex min-h-screen flex-col space-y-24 pb-6">
              <Nav />
              <section className="flex flex-col mb-16 min-h-[68rem] py-16 h-fit w-full items-center space-y-12">
                {children}
              </section>
              <footer className="absolute bottom-0 w-full p-6 font-semibold text-lg border-t-2 text-center">
                My Footer
              </footer>
            </main>
          </JotaiProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
