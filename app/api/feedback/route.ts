import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongoose';
import Feedback from '../../models/feedback'; // Assuming Feedback model exists
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  // Connect to the database
  await connectToDatabase();

  // Verify user token
  const user: any = verifyToken(req.headers.get('Authorization') || '');
  
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Fetch feedbacks and populate the event details (including event name)
  const feedbacks = await Feedback.find({ userId: user.id })
    .populate({
      path: 'eventId', // Reference field in Feedback schema
      select: 'eventName', // Select the eventName field from the Event schema
    });

  // Return the feedbacks with event names
  return NextResponse.json(feedbacks);
}
