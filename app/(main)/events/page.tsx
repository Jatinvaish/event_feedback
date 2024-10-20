"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';
import FeedbackForm from '@/components/Feedback/FeedbackForm';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IEvent } from '@/types/event';
import { useToast } from '@/hooks/use-toast';



const EventsPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data: IEvent[] = await res.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const checkUserRole = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user: any = JSON.parse(storedUser);
        setIsAdmin(user && user?.role === 'admin');
      }
    };

    fetchEvents();
    checkUserRole();
  }, []);



  const handleFeedbackSubmit = async (data: { eventId?: string; feedback: { comments: string; rating: number } }) => {
    try {

      setIsOpen(false); // Open the dialog

      const res = await fetch('/api/feedback/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use JWT token for authorization
        },
        body: JSON.stringify({ eventId: data.eventId, comments: data.feedback.comments, rating: data.feedback.rating }),
      });

      if (res.ok) {
        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Feedback submitted successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed!',
          description: 'Failed to submitted Feddback',
        });
        console.error('Failed to create event');
      }
    } catch (error) {
    }
  };

  const eventColumns: ColumnDef<IEvent>[] = [
    {
      accessorKey: 'eventName',
      header: "Event's Name",
    },
    {
      accessorKey: 'eventDescription',
      header: 'Description',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuItem className="my-1">
              <Button
                onClick={() => {
                  setSelectedEventId(row.original._id); // Set the selected event ID
                  setIsOpen(true); // Open the dialog
                }}
              >
                Give Feedback
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 50,
    },
  ];

  return (
    <>
      {isAdmin && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4 float-right"
          onClick={() => router.push('/events/add')}
        >
          Create Event
        </button>
      )}

      <DataTable columns={eventColumns} data={events} />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
          </DialogHeader>
          <FeedbackForm
            eventId={selectedEventId} // Pass the selected event ID to the FeedbackForm
            onSubmit={handleFeedbackSubmit}
          />
          <DialogFooter>
            <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventsPage;
