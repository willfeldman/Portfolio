import type { Metadata } from "next";
import { privacyCopy } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${site.url.replace("https://", "")} collects: aggregate, cookie-free analytics, and questions typed into Ask about Will.`,
  alternates: { canonical: "/privacy", types: { "text/markdown": "/privacy.md" } },
};

export default function Privacy() {
  return (
    <main id="main" className="page page--tight">
      <header className="page-head m-in">
        <h1 className="display-lg">Privacy</h1>
        <p className="lede">{privacyCopy.lede}</p>
        <p className="caption">Updated {privacyCopy.updated}</p>
      </header>
      <article className="prose">
        {privacyCopy.sections.map((s) => (
          <section key={s.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2>{s.title}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
