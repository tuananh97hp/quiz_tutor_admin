import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_CONFIG } from '@/utils/constants';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from '@/router/routes';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: AUTH_CONFIG.JWR_SECRET });
  if (!token) {
    const redirectUrl = new URL(ROUTES.LOGIN, request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  if (token) {
    if (!token.email_verified_at) {
      return NextResponse.redirect(new URL('/request-email-verification', request.url));
    }

    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

/*
  matcher allows you to filter Middleware to run on specific paths.
*/
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|login|forgot-password).*)'],
};
