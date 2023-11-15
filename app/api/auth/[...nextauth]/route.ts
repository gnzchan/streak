import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 3600,
  },
  callbacks: {
    jwt: async ({ token, account }: { token: any; account: any }) => {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.token = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
