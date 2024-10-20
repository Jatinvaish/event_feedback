// models/feedback.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface FeedbackDocument extends Document {
  userId: string;
  eventId: string;
  feedback: string;
  rating: number;
  createdAt: Date;
}

const FeedbackSchema: Schema<FeedbackDocument> = new mongoose.Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const Feedback: Model<FeedbackDocument> = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
