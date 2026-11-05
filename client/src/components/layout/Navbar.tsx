import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Download, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';
import { siteConfig } from '../../data/config';

const NAV_ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const activeSection = useActiveSection(NAV_ITEMS.map(i => i.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavClick = (id: string) => {
    if (isHome) {
      scrollToSection(id);
    } else {
      window.location.href = `/#${id}`;
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus-visible:outline-none"
          aria-label="Devang Chaudhari — Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[var(--text-primary)] hidden sm:block">
            Devang Chaudhari<span className="text-emerald-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`btn-ghost text-sm transition-colors duration-200 ${
                  isHome && activeSection === item.id
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-[var(--text-secondary)]'
                }`}
                aria-current={isHome && activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          

          <a
            href={siteConfig.resumeFile}
            download
            className="btn-primary text-xs py-2 px-4"
            aria-label="Download resume PDF"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="btn-ghost p-2 rounded-lg"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="btn-ghost p-2 rounded-lg"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/98 backdrop-blur-lg"
          >
            <div className="section-container py-4">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        isHome && activeSection === item.id
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2 border-t border-[var(--border-subtle)] mt-2">
                  <a
                    href={siteConfig.resumeFile}
                    download
                    className="btn-primary w-full justify-center text-sm py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download Resume
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
