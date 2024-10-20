import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescripion: { type: String, required: true },
  eventDate: { type: Date, required: true },
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;
