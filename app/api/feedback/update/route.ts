import { NextRequest, NextResponse } from 'next/server';
import Feedback from '../../../models/feedback';
import { connectToDatabase } from '@/lib/db/mongoose';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Verify the user from the JWT token
    const user: any = verifyToken(req.headers.get('Authorization') || '');

    // Extract feedback data from request body
    const { eventId, comments, rating, _id } = await req.json();

    let feedback;

    if (_id) {
      // If _id is provided, update the existing feedback
      feedback = await Feedback.findByIdAndUpdate(
        _id,
        {
          feedback: comments,
          rating,
          userId: user.id,
          eventId: eventId,
        },
        { new: true } // Return the updated document
      );

      if (!feedback) {
        return NextResponse.json({ message: 'Feedback not found' }, { status: 404 });
      }
    } else {
      // If no _id, create a new feedback entry
      feedback = await Feedback.create({
        feedback: comments,
        rating,
        userId: user.id,
        eventId: eventId,
      });
    }

    // Return the feedback data (created or updated)
    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
