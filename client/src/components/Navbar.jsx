import { useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ scrolled, profile }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`topbar${scrolled ? ' topbar-scrolled' : ''}`}>
      <div className="topbar-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          Reagan Munene
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav aria-label="Primary">
          <ul className={`nav-links${open ? ' open' : ''}`}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            {profile?.github ? (
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  GitHub
                </a>
              </li>
            ) : null}
            {profile?.linkedin ? (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}
