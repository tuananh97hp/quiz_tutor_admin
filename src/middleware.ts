import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ROUTES } from '@/router/routes';
import { STORAGE_KEYS } from '@/utils/constants';

export async function middleware(request: NextRequest) {
  let token: string | undefined;
  const { pathname } = request.nextUrl;

  // check exists token
  if (request.cookies.has(STORAGE_KEYS.CSRF_TOKEN)) {
    token = request.cookies.get(STORAGE_KEYS.CSRF_TOKEN)?.value;
  }

  if (!token && !pathname.startsWith(ROUTES.LOGIN)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (token && pathname.startsWith(ROUTES.LOGIN)) {
    return NextResponse.redirect(new URL(ROUTES.HOME_PAGE, request.url));
  }

  return NextResponse.next();
}

/*
  matcher allows you to filter Middleware to run on specific paths.
*/
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|forgot-password).*)'],
};
