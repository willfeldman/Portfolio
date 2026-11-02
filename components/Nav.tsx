"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="site-header">
      <nav aria-label="Main" className="site-nav">
        <Link href="/" className="site-brand">
          <img src={site.memoji} alt="" width={36} height={36} />
          <span>{site.name}</span>
        </Link>
        <div className="site-nav__links">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`gr-btn ${active ? "gr-btn--secondary" : "gr-btn--ghost"}`}
                aria-current={active ? "page" : undefined}
              >
                <span>{l.label}</span>
              </Link>
            );
          })}
          <Link href="/contact" className="gr-btn gr-btn--outline site-nav__cta">
            <span>Get in touch</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
