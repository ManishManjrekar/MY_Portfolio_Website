"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { ModeToggle } from "./ModeProvider";

const links = [
  { href: "#work", label: "Work" },
  { href: "#lab", label: "Lab" },
  { href: "#ask", label: "Ask" },
  { href: "#career", label: "Career" },
  { href: profile.architectureUrl, label: "Architecture", external: true },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="monogram" aria-hidden="true">{profile.initials}</span>
          <span>{profile.name}</span>
        </a>
        <nav aria-label="Primary" className={`nav-links${open ? " open" : ""}`} id="primary-nav">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {l.label}
              {l.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ModeToggle compact />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M3 6h12M3 12h12" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
