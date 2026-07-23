// Form validation schemas using Zod
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be under 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100, 'Company name must be under 100 characters').optional().or(z.literal('')),
  phone: z.string().regex(/^[\d\-+()\s]{7,20}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be under 2000 characters'),
});

export const resumeFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^[\d\-+()\s]{7,20}$/, 'Valid phone is required'),
  positionId: z.string().min(1, 'Please select a position'),
  coverLetter: z.string().max(3000, 'Cover letter must be under 3000 characters').optional().or(z.literal('')),
});

export const demoRequestSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  company: z.string().min(1, 'Company name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^[\d\-+()\s]{7,20}$/, 'Valid phone is required'),
  productInterest: z.string().optional().or(z.literal('')),
  preferredDate: z.string().optional().or(z.literal('')),
  message: z.string().max(1000, 'Message must be under 1000 characters').optional().or(z.literal('')),
});

export const downloadFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  email: z.string().email('Valid email is required'),
  company: z.string().max(100).optional().or(z.literal('')),
  consent: z.literal(true, { message: 'You must agree to the privacy policy' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ResumeFormData = z.infer<typeof resumeFormSchema>;
export type DemoRequestData = z.infer<typeof demoRequestSchema>;
export type DownloadFormData = z.infer<typeof downloadFormSchema>;
