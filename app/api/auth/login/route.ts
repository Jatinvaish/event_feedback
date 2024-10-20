import { NextResponse } from 'next/server';
import User from '../../../models/user';
import { connectToDatabase } from '@/lib/db/mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Connect to the database
  await connectToDatabase();

  // Find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Compare passwords
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Create a JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user && user?.role },
    process.env.JWT_SECRET as string, // Replace this with your actual secret
    {
      expiresIn: process.env.JWT_EXPIRE, // Token will expire in 1 hour
    }
  );

  // Create the response and set the JWT token in cookies
  const response = NextResponse.json({
    success: true,
    message: 'Login successful!',
    token:token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user && user?.role,
    }, // Returning user data excluding password
  });

  // Set the cookie with the JWT token
  response.cookies.set('token', token, {
    httpOnly: true, // Protects against XSS attacks by not allowing JavaScript to access the cookie
    secure: process.env.NODE_ENV === 'production', // Use 'secure' only in production
    sameSite: 'strict', // CSRF protection
    maxAge: 60 * 60, // Token is valid for 1 hour
    path: '/', // Cookie is valid site-wide
  });

  return response;
}
