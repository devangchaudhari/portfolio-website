import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must contain at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address' })
    .max(200, { message: 'Email cannot exceed 200 characters' })
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(5, { message: 'Subject must contain at least 5 characters' })
    .max(200, { message: 'Subject cannot exceed 200 characters' })
    .trim(),
  message: z
    .string()
    .min(20, { message: 'Message must be at least 20 characters' })
    .max(3000, { message: 'Message cannot exceed 3000 characters' })
    .trim(),
  website: z.string().optional(), // Honeypot trap for spambots
});

export type ContactInput = z.infer<typeof contactSchema>;
