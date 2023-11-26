import requests from "@/lib/utils/requests";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.id_token) {
        token.jwtToken = account.id_token;
      }
      const result = await requests(
        process.env.NEXT_PUBLIC_API + "/google/",
        "POST",
        { auth_token: token.jwtToken },
        (error) => console.error("Login error:", error)
      );
      console.log("Login success: ", result);
      return token;
    },
    session: async ({ session, token }: any) => {
      session.accessToken = token.accessToken;
      return session;
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
