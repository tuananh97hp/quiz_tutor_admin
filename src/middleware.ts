import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_CONFIG } from '@/utils/constants';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from '@/router/routes';

const GUEST_URL = ['login', 'forgot-password'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: AUTH_CONFIG.JWR_SECRET });
  const isGuestUrl = GUEST_URL.some((url) => request.nextUrl.pathname.startsWith(`/${url}`));
  if (!token && !isGuestUrl) {
    const redirectUrl = new URL(ROUTES.LOGIN, request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }
  if (token) {
    if (isGuestUrl) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

/*
  matcher allows you to filter Middleware to run on specific paths.
*/
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
