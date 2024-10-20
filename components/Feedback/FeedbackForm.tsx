'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define the schema for validation using Zod
const formSchema = z.object({
  comments: z.string(),
  rating: z
    .union([z.string(), z.number()]) // Handle string or number input
    .transform((val) => Number(val)), // Coerce to number
});

interface FeedbackFormProps {
  eventId: string;
  feedbackData?: {
    comments: string;
    rating: number;
    _id?: string;
  }; // Feedback data to fill in the form when editing
  onSubmit: (data: { eventId: string; feedback: { comments: string; rating: number, _id?: string } }) => void; // Callback to return feedback data
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  eventId,
  feedbackData,
  onSubmit,
}) => {
  // Always call useForm regardless of eventId
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: feedbackData?.comments || '',
      rating: feedbackData?.rating || 1, // Default to 1 if no rating is provided
    },
  });

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Call the onSubmit prop with feedback data and event ID
    onSubmit({ eventId, feedback: data });
    // Reset form after submission
    form.reset();
  };

  // Early return if eventId is not provided
  if (!eventId || eventId === '') {
    return null; // Return null instead of undefined to avoid rendering issues
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

        {/* Description Field */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                Comment
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  placeholder="Enter your feedback description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating Field */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                Rating (1-5)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  placeholder="Enter rating from 1 to 5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
