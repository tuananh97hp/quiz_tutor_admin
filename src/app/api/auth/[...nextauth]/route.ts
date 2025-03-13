import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Auth0 from 'next-auth/providers/auth0';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomBytes } from 'node:crypto';
import AuthService from '@/services/AuthService';

const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token, user }) {
      const sessionUpdate: Session = { ...session };
      sessionUpdate.accessToken = token.accessToken as string;
      return session;
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
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const data: { user: User; access_token: string } = await AuthService.login(credentials);
          console.log('------------------', data);
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
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomBytes(32).toString('hex');
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  secret: 'your_secret',
  events: {},
  theme: {},
  useSecureCookies: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
