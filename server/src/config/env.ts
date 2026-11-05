import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000').transform(val => parseInt(val, 10)),
  CLIENT_URL: z.string().default('http://localhost:3000'),

  // Database
  DATABASE_URL: z.string().optional(),

  // Email Config (Nodemailer / SMTP)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional().transform(val => (val ? parseInt(val, 10) : 587)),
  SMTP_SECURE: z.string().optional().transform(val => val === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default('noreply@devangchaudhari.dev'),
  RECIPIENT_EMAIL: z.string().default('devangchaudhari2003@gmail.com'),

  // Optional AI integration
  GEMINI_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
