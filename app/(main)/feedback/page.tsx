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
import { Feedback } from '@/types/feedback';
import { useToast } from '@/hooks/use-toast';


const FeedbackPage = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [auth, setAuth] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [currentFeedbackData, setCurrentFeedbackData] = useState<Feedback>({ eventId: '', _id: '', comments: '', rating: 1 });
  const router = useRouter();


  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      console.log('comments', token);
      const res = await fetch('/api/feedback', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data: Feedback[] = await res.json();
        setFeedbackData(data);
      } else {
        console.error("Failed to fetch Feedbacks");
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleFeedbackUpdate = async (data: { eventId?: string; feedback: { comments: string; rating: number, _id?: string } }) => {
    try {

      setIsOpen(false); // Open the dialog

      const res = await fetch('/api/feedback/update', {
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
          description: 'Feedback updated successfully',
        });
        await fetchFeedbacks()
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed!',
          description: 'Failed to updated Feddback',
        });
        console.error('Failed to create event');
      }
    } catch (error) {
    }
  };

  const handleDelete = async (feedbackId: string) => {
    try {
      const res = await fetch('/api/feedback/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use JWT token for authorization
        },
        body: JSON.stringify({ feedbackId }),
      });

      if (res.ok) {
        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Feedback deleted successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed!',
          description: 'Failed to delete the Feddback',
        });
      }
    } catch (error) {
    }
  };
  const handleEdit = (data: any) => {
    setSelectedEventId(data.eventId);
    setCurrentFeedbackData({ ...data, comments: data?.feedback });
    setIsOpen(true);
  }
  useEffect(() => {
    const checkUserRole = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user: any = JSON.parse(storedUser);
        setAuth(user && user !== '');
      }
    };

    fetchFeedbacks();
    checkUserRole();
  }, []);

  const feedBackColumns: ColumnDef<Feedback>[] = [
    {
      accessorKey: 'eventName',
      header: "Event Name",
    },
    {
      accessorKey: 'feedback',
      header: "Comments",
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
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
            {auth && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="my-1">
                  <Button onClick={() => handleEdit(row.original)}>Edit</Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="my-1">
                  <Button onClick={() => handleDelete(row.original._id || '')} variant='destructive'>Delete</Button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 50,
    },
  ];

  return (
    <>
      <DataTable columns={feedBackColumns} data={feedbackData} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
          </DialogHeader>
          <FeedbackForm
            eventId={selectedEventId} // Pass the selected event ID to the FeedbackForm
            onSubmit={handleFeedbackUpdate}
            feedbackData={currentFeedbackData}
          />
          <DialogFooter>
            <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackPage;
