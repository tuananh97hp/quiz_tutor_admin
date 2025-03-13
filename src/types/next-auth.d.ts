import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      email_verified_at?: string | null;
      first_name?: string;
      last_name?: string;
      role_id: number;
    } & DefaultSession['user'];
    accessToken?: string | null;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    first_name?: string;
    last_name?: string;
    role_id: number;
  }
}
