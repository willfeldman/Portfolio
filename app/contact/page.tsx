import type { Metadata } from "next";
import { CopyEmail } from "@/components/CopyEmail";
import { Icon } from "@/components/Icon";
import { contactCopy } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${site.name}: email ${site.email}, LinkedIn or GitHub.`,
  alternates: { canonical: "/contact", types: { "text/markdown": "/contact.md" } },
};

export default function Contact() {
  return (
    <main id="main" className="page page--tight page--contact">
      <header className="page-head m-in">
        <h1 className="display-lg">Get in touch</h1>
        <p className="lede">{contactCopy.lede}</p>
        <div className="row-wrap" style={{ marginTop: 8 }}>
          <a className="gr-btn gr-btn--primary gr-btn--lg" href={`mailto:${site.email}`}>
            <Icon name="mail" />
            <span>{site.email}</span>
          </a>
          <CopyEmail />
        </div>
      </header>
      <div className="prose m-in" style={{ "--i": 1 } as React.CSSProperties}>
        {contactCopy.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="contact-grid m-stagger">
        {contactCopy.links.map((l) => (
          <a key={l.label} className="contact-card" href={l.href}>
            <span className="caption">{l.label}</span>
            <b>{l.value}</b>
          </a>
        ))}
      </div>
    </main>
  );
}
