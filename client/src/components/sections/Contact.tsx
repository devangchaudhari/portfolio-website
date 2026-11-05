// ─── Contact Section ──────────────────────────────────────────────────────────

import { useState, useId, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Clock, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '../../data/config';
import { useInView } from '../../hooks/useInView';

// ── Types ─────────────────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ── Validation ────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Omit<FormValues, 'website'>): FormErrors {
  const errors: FormErrors = {};
  if (!values.name || values.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!values.email || !EMAIL_RE.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (!values.subject || values.subject.trim().length < 5)
    errors.subject = 'Subject must be at least 5 characters.';
  if (!values.message || values.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';
  return errors;
}

// ── Field component ───────────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

function Field({ id, label, error, required = false, children }: FieldProps) {
  const errorId = `${id}-error`;
  const child = children as React.ReactElement<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & { 'aria-invalid'?: boolean | 'false' | 'true'; 'aria-describedby'?: string }>;
  const enriched = {
    ...child,
    props: {
      ...child.props,
      id,
      'aria-invalid': error ? ('true' as const) : ('false' as const),
      'aria-describedby': error ? errorId : undefined,
      className: [
        child.props.className ?? '',
        'w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
        error
          ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/40'
          : 'border-white/10 focus:border-emerald-500/60 focus:ring-emerald-500/30 hover:border-white/20',
      ]
        .join(' ')
        .trim(),
    },
  };

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-300"
      >
        {label}
        {required && (
          <span className="ml-1 text-emerald-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {enriched}
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const baseId = useId();

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        const { [name as keyof FormErrors]: _, ...rest } = errors;
        const newErr = validate({ ...values, [name]: value });
        setErrors({ ...rest, ...(newErr[name as keyof FormErrors] ? { [name]: newErr[name as keyof FormErrors] } : {}) });
      }
    },
    [touched, errors, values]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const newErrors = validate(values);
      setErrors((prev) => ({ ...prev, ...(newErrors[name as keyof FormErrors] ? { [name]: newErrors[name as keyof FormErrors] } : { [name]: undefined }) }));
    },
    [values]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all as touched
      setTouched({ name: true, email: true, subject: true, message: true });

      // Honeypot — silently succeed
      if (values.website) {
        setStatus('success');
        return;
      }

      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus('loading');
      setServerError('');

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim().toLowerCase(),
            subject: values.subject.trim(),
            message: values.message.trim(),
          }),
        });

        const data = (await res.json()) as { success: boolean; error?: string };

        if (!res.ok || !data.success) {
          throw new Error(data.error ?? 'Something went wrong. Please try again.');
        }

        setStatus('success');
        setValues({ name: '', email: '', subject: '', message: '', website: '' });
        setTouched({});
        setErrors({});
      } catch (err) {
        setStatus('error');
        setServerError(
          err instanceof Error ? err.message : 'Something went wrong. Please try again.'
        );
      }
    },
    [values]
  );

  const handleRetry = () => {
    setStatus('idle');
    setServerError('');
  };

  const id = (suffix: string) => `${baseId}-${suffix}`;

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      aria-label="Get In Touch"
      className="relative py-24 md:py-32"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            Get In Touch
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let's Work{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Open to full-time opportunities in software engineering, backend
            development, data engineering, and AI automation.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-10 lg:grid-cols-5"
        >
          {/* ── Left: contact info ────────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/5 sm:p-8">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-400">
                Contact Info
              </h3>

              <ul className="space-y-5" role="list">
                {/* Email */}
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-200">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium break-all">{siteConfig.email}</span>
                  </a>
                </li>

                {/* LinkedIn */}
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-200">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </li>

                {/* GitHub */}
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-200">
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </li>
              </ul>

              {/* Notes */}
              <div className="mt-8 space-y-3 border-t border-white/5 pt-6">
                <div className="flex items-start gap-2.5 text-sm text-slate-400">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>Usually responds within 24 hours</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-400">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>Contact information is kept private and never shared.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: contact form ────────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/5 sm:p-8">

              {/* Success state */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Message sent!</h3>
                  <p className="text-slate-400">
                    I'll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-300 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Honeypot — hidden from real users */}
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
                  >
                    <label htmlFor={id('website')}>Website</label>
                    <input
                      id={id('website')}
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id={id('name')}
                        label="Name"
                        error={touched.name ? errors.name : undefined}
                        required
                      >
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          placeholder="Devang Chaudhari"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={status === 'loading'}
                        />
                      </Field>

                      <Field
                        id={id('email')}
                        label="Email"
                        error={touched.email ? errors.email : undefined}
                        required
                      >
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={status === 'loading'}
                        />
                      </Field>
                    </div>

                    {/* Subject */}
                    <Field
                      id={id('subject')}
                      label="Subject"
                      error={touched.subject ? errors.subject : undefined}
                      required
                    >
                      <input
                        type="text"
                        name="subject"
                        autoComplete="off"
                        placeholder="Full-time backend engineering opportunity"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'loading'}
                      />
                    </Field>

                    {/* Message */}
                    <Field
                      id={id('message')}
                      label="Message"
                      error={touched.message ? errors.message : undefined}
                      required
                    >
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Tell me about the role or project…"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={status === 'loading'}
                        style={{ resize: 'vertical' }}
                      />
                    </Field>

                    {/* Server error */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3"
                        role="alert"
                        aria-live="assertive"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                        <div className="flex-1 text-sm text-red-400">
                          {serverError}
                          <button
                            type="button"
                            onClick={handleRetry}
                            className="ml-2 underline underline-offset-2 hover:text-red-300"
                          >
                            Try again
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Sending…
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;

