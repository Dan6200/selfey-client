import requests from "@/lib/utils/requests";
import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.id_token) {
        token.jwtToken = account.id_token;
      }
      const apiResponse = await requests(
        process.env.NEXT_PUBLIC_API + "/google/",
        "POST",
        { auth_token: token.jwtToken },
        (error) => console.error("Login error:", error)
      );
      token.apiResponse = apiResponse;
      return token;
    },
    session: async ({ session, token }: any) => {
      session.accessToken = token.jwtToken;
      session.apiResponse = token.apiResponse;
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
