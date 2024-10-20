import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.json({ message: 'Cookie cleared successfully' });

  // Clear the 'token' cookie by setting its expiration date in the past
  response.cookies.set('token', '', {
    httpOnly: true, // Prevent client-side access
    path: '/',      // Path for the cookie
    expires: new Date(0), // Expire the cookie immediately
  });

  return response;
}
