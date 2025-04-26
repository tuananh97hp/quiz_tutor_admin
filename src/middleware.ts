import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_CONFIG, USER_ROLE } from '@/utils/constants';
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
    if (
      token.force_change_password &&
      !request.nextUrl.pathname.startsWith(`/force-change-password`)
    ) {
      const redirectUrl = new URL(ROUTES.FORCE_CHANGE_PASSWORD, request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    }
    if (
      (request.nextUrl.pathname.startsWith(`/student`) && token.role !== USER_ROLE.STUDENT) ||
      (request.nextUrl.pathname.startsWith(`/teacher`) && token.role !== USER_ROLE.TEACHER) ||
      (request.nextUrl.pathname.startsWith(`/admin`) && token.role !== USER_ROLE.ADMIN) ||
      (request.nextUrl.pathname.startsWith(`/referrer`) && token.role !== USER_ROLE.REFERRER)
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }

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
