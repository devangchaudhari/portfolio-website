import { Github, Linkedin, Mail, Code2, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[var(--text-primary)]">
                Devang Chaudhari
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Software engineer building reliable backend systems, data pipelines, and AI-powered applications.
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--text-muted)]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Pune, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {[
                { label: 'Experience', id: 'experience' },
                { label: 'Projects', id: 'projects' },
                { label: 'Engineering Lab', id: 'lab' },
                { label: 'About', id: 'about' },
                { label: 'Contact', id: 'contact' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-emerald-400 transition-colors duration-150"
                  aria-label="GitHub profile"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  GitHub
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-emerald-400 transition-colors duration-150"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              )}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-emerald-400 transition-colors duration-150"
                  aria-label={`Email ${siteConfig.email}`}
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>© {year} Devang Chaudhari. All rights reserved.</span>
          
        </div>
      </div>
    </footer>
  );
}
