import { NextResponse } from 'next/server';
import User from '../../../models/user';
import { connectToDatabase } from '@/lib/db/mongoose';
import bcrypt from 'bcrypt';
import { verifyToken } from '@/lib/auth';
import Feedback from '@/app/models/feedback';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  await connectToDatabase();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: 'User registered successfully' });
}
