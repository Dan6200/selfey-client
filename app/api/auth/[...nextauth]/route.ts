import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.id_token) {
        token.jwtToken = account.id_token;
      }
      console.log("token", token);
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
