import { NextResponse } from 'next/server';
import Event from '../../models/event';
import { connectToDatabase } from '@/lib/db/mongoose';
import { verifyToken } from '@/lib/auth';


export async function GET() {
  await connectToDatabase();
  const events = await Event.find({});
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const user = verifyToken(req.headers.get('Authorization') || '');

  if (user && user?.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const eventData = await req.json();
  const newEvent = await Event.create(eventData);
  return NextResponse.json(newEvent, { status: 201 });
}