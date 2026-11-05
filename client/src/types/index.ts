// ─── Global Types ─────────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // spam protection
}

export interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}

export type SectionId =
  | 'hero'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'lab'
  | 'impact'
  | 'education'
  | 'about'
  | 'contact';
