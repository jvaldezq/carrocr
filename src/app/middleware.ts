// import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

// This is your single entry point for all middleware logic
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log('HELLOOOOO', pathname);

  if (pathname.startsWith('/admin')) {
    // const isAdminAuthenticated = request.cookies.has('admin-session-cookie');
    //
    // if (!isAdminAuthenticated) {
    //   console.log(
    //     'Admin authentication failed for:',
    //     pathname,
    //     'Redirecting to admin login.',
    //   );
    // return NextResponse.redirect(new URL('/admin/login', request.url));
    console.log('HELLOOOOO');
  }

  // console.log('Admin authentication passed for:', pathname);
  // return NextResponse.next();

  return withMiddlewareAuthRequired({
    returnTo: '/api/auth/login',
  });
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};
