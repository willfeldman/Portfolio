import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  const pages = [
    { href: "/work", label: "Work" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <main id="main" className="page page--tight">
      <header className="page-head m-in">
        <h1 className="display-lg">Page not found</h1>
        <p className="lede">There’s nothing at this address. It may have moved when the site was rebuilt.</p>
        <div className="row-wrap" style={{ marginTop: 8 }}>
          <Link className="gr-btn gr-btn--primary gr-btn--lg" href="/">
            <span>Go home</span>
            <Icon name="arrowRight" />
          </Link>
          {pages.map((p) => (
            <Link key={p.href} className="gr-btn gr-btn--ghost gr-btn--lg" href={p.href}>
              <span>{p.label}</span>
            </Link>
          ))}
        </div>
      </header>
    </main>
  );
}
