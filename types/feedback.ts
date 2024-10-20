export interface Feedback {
    _id?: string;
    eventId: string;
    comments: string;
    feedback?: string;
    rating: number;
    userId?: string;
    createdAt?: Date | null;
  }