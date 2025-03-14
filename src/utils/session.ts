import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function getCurrentAccessToken() {
  const session = await getServerSession(authOptions);

  return session?.accessToken;
}
