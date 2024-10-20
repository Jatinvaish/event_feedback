import { NextResponse } from 'next/server';
import Feedback from '../../../models/feedback';
import { connectToDatabase } from '@/lib/db/mongoose';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  await connectToDatabase();
  const user: any = verifyToken(req.headers.get('Authorization') || '');
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { feedbackId } = await req.json();

  await Feedback.deleteOne({feedbackId});

  return NextResponse.json('Feedback Deleted Succesfully', { status: 201 });
}