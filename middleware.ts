// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes
const publicRoutes = ['/', '/login', '/register', ];

export function middleware(request: NextRequest) {
  // Get the token (or any identifier for the logged-in user)
  const token = request.cookies.get('token'); // Adjust according to how you store your token

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the request is for a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // If the user is trying to access a protected route and is not authenticated
  if (!isPublicRoute && !token) {
    // Redirect to the login page or a public route
    return NextResponse.redirect(new URL('/', request.url)); // Adjust this as needed
  }

  // If the user is authenticated, allow the request to continue
  return NextResponse.next();
}

// You can also specify which routes to apply the middleware to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Exclude API routes and static files
};
