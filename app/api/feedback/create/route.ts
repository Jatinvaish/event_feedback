import { NextRequest, NextResponse } from 'next/server';
import Feedback from '../../../models/feedback';
import { connectToDatabase } from '@/lib/db/mongoose';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const user: any = verifyToken(req.headers.get('Authorization') || '');

  const { eventId, comments, rating } = await req.json();
  console.log('eventId, comments, rating', eventId, comments, rating);

  const feedback = await Feedback.create({
    feedback: comments,
    rating,
    userId: user.id,
    eventId: eventId,
  });

  return NextResponse.json(feedback, { status: 201 });
}