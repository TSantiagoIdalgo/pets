import z from 'zod';

export const sheetSchema = z.object({
  location: z.string().min(3),
  phone: z.string().min(10),
  age: z.number(),
  occupation: z.string().min(5).optional(),
  home_type: z.string().min(3),
  reasons_for_adopting: z.string().min(10),
  home_visit_agreement: z.boolean(),
  preferred_gender: z.string(),
  user_id: z.string().email()
});