import z from 'zod';

export const advertisementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(1, 'Description is required'),
  user_id: z.string().email('Invalid email'),
});