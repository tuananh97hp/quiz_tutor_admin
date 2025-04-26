import { NextAuthOptions, Session, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Auth0 from 'next-auth/providers/auth0';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '@/services/AuthService';
import { AUTH_CONFIG } from '@/utils/constants';

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      const accessToken = token?.accessToken as string;
      if (accessToken) {
        const { exp: accessTokenExpires } = JSON.parse(
          Buffer.from(accessToken.split('.')[1], 'base64').toString(),
        );
        if (!accessTokenExpires) {
          return token;
        }
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;
        if (accessTokenHasExpired) {
          token.error = 'RefreshAccessTokenError';
        }
      }

      return { ...token, ...user, ...session };
    },
    session({ session, token }) {
      const sessionUpdate: Session = { ...session };
      sessionUpdate.accessToken = token.accessToken as string;
      sessionUpdate.user.role = token.role as string;
      sessionUpdate.user.id = token.id as number;
      sessionUpdate.user.username = token.username as string;
      sessionUpdate.user.force_change_password = token.force_change_password as boolean;
      if (token.error) {
        throw new Error('token expired');
      }

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
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt', // 🛡 Dùng JWT thay vì database sessions
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // JWT cũng 30 ngày
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  secret: AUTH_CONFIG.JWR_SECRET,
};
