import z from 'zod';

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[@])(?=.*[A-Z])(?=.*\d).+$/),
  role: z.enum(['adopter', 'rescuer'] )
});