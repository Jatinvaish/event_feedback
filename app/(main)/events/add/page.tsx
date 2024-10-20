"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const CreateEventPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Use JWT token for authorization
      },
      body: JSON.stringify({ eventName : name, eventDescripion: description , eventDate: new Date()}),
    });

    if (res.ok) {
      // Optionally redirect to the events page or show success message
      window.location.href = '/events'; // Redirect to the events page
    } else {
      // Handle error (optional)
      console.error('Failed to create event');
    }
  };

  return (
    <div>
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Event Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
              rows={4}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Create Event
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateEventPage;
