import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../data/navigation';
import { externalLinks } from '../data/externalLinks';
import { siteSettings } from '../data/siteSettings';
import ExternalCta from './ExternalCta';

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function FooterSection({ title, children }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  return (
    <div className={`footer-section ${open ? 'open' : ''}`}>
      <button className="footer-section-toggle" type="button" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen((current) => !current)}>
        <span>{title}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <h2 className="footer-section-title">{title}</h2>
      <div className="footer-section-content" id={contentId}>{children}</div>
    </div>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const menu = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    function handleMenuKeys(event) {
      if (!open) return;

      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [menuButton.current, ...menu.current.querySelectorAll(focusableSelector)].filter(Boolean);
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleMenuKeys);
    return () => document.removeEventListener('keydown', handleMenuKeys);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand-logo" to="/" aria-label="Garden Street School of the Performing Arts home">
            <img
              src="/images/brand/garden-street-logo-black-dark-green-transparent.webp"
              width="2400"
              height="1320"
              alt="Garden Street School of the Performing Arts"
            />
          </Link>
          <button
            ref={menuButton}
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <nav ref={menu} id="main-nav" className={open ? 'open' : ''} aria-label="Main navigation">
            {navigation.map(([label, to]) => (
              <NavLink key={to} to={to}>{label}</NavLink>
            ))}
            <ExternalCta href={externalLinks.generalRegistration}>Register</ExternalCta>
          </nav>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <Link className="brand-logo footer-logo" to="/" aria-label="Garden Street home">
              <img
                src="/images/brand/garden-street-logo-white-bright-green-transparent.webp"
                width="2400"
                height="1320"
                alt="Garden Street School of the Performing Arts"
                loading="lazy"
              />
            </Link>
            <p>Performing arts in Hoboken since 2005.</p>
            <ExternalCta className="button footer-register" href={externalLinks.generalRegistration}>View Classes & Register</ExternalCta>
          </div>
          <FooterSection title="Visit">
            <address>{siteSettings.address}</address>
            <a href={`tel:${siteSettings.phone.replaceAll('-', '')}`}>{siteSettings.phone}</a>
            <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
            <ExternalCta href={externalLinks.directions} className="footer-link">Get directions</ExternalCta>
          </FooterSection>
          <FooterSection title="Explore">
            <Link to="/important-dates">Important Dates</Link>
            <ExternalCta href={externalLinks.parentLogin} className="footer-link">Parent Login</ExternalCta>
            <ExternalCta href={externalLinks.shop} className="footer-link">Shop</ExternalCta>
            <ExternalCta href={externalLinks.mailingList} className="footer-link">Mailing List</ExternalCta>
            <ExternalCta href={externalLinks.instagram} className="footer-link">Instagram</ExternalCta>
          </FooterSection>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Garden Street Performing Arts</p>
          <p>Privacy policy coming soon.</p>
        </div>
      </footer>
    </>
  );
}
