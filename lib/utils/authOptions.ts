import { SessionStrategy } from "next-auth";
import requests from "./requests";
import GoogleProvider from "next-auth/providers/google";

export default {
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    jwt: async ({ token, account }: any) => {
      if (account?.id_token) {
        token.jwtToken = account.id_token;
      }
      const apiResponse = await requests(
        process.env.NEXT_PUBLIC_API + "/google/",
        "POST",
        { auth_token: token.jwtToken }
      );
      token.apiResponse = apiResponse;
      return token;
    },
    session: async ({ session, token }: any) => {
      session.accessToken = token.jwtToken;
      session.apiResponse = token.apiResponse;
      return session;
    },
    redirect({ url, baseUrl }: any) {
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
