import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Auth0 from 'next-auth/providers/auth0';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '@/services/AuthService';
import { AUTH_CONFIG } from '@/utils/constants';

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session({ session, token }) {
      const sessionUpdate: Session = { ...session };
      sessionUpdate.accessToken = token.accessToken as string;

      return sessionUpdate;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID || '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const data: { user: User; access_token: string } = await AuthService.login(credentials);
          return { ...data.user, accessToken: data?.access_token };
        } catch (e) {
          throw new Error('An error has occurred during login request');
        }
      },
    }),
    // ...add more providers here
  ],
  cookies: {},
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  adapter: {},
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  secret: AUTH_CONFIG.JWR_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
