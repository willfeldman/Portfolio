import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { experiences } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = experiences.find((x) => x.slug === slug);
  if (!e) return {};
  return {
    title: e.company,
    description: `${e.positions[0].title} at ${e.company}, ${e.range}. ${e.summary}`,
    alternates: { canonical: `/work/${slug}`, types: { "text/markdown": `/work/${slug}.md` } },
  };
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = experiences.find((x) => x.slug === slug);
  if (!e) notFound();
  const latest = e.positions[0];

  return (
    <main id="main" className="page page--detail">
      <Link className="gr-btn gr-btn--ghost back-link" href="/work">
        <Icon name="arrowLeft" size={16} />
        <span>All experience</span>
      </Link>

      <header className="detail-head m-in">
        <img className="logo logo--88" src={e.logo} alt={`${e.company} logo`} />
        <div className="detail-head__text">
          <h1 className="display-lg">{e.company}</h1>
          <p className="lede">
            {latest.title} · {e.location} · {e.range}
          </p>
        </div>
        <div className="row-wrap">
          {e.url && (
            <a className="gr-btn gr-btn--outline" href={e.url}>
              <span>Website</span>
              <Icon name="arrowUpRight" size={16} />
            </a>
          )}
          {e.linkedin && (
            <a className="gr-btn gr-btn--outline" href={e.linkedin}>
              <span>LinkedIn</span>
              <Icon name="arrowUpRight" size={16} />
            </a>
          )}
        </div>
      </header>

      {e.stats && (
        <section className="stats m-stagger" aria-label="Highlights">
          {e.stats.map((s) => (
            <div key={s.value} className="stat">
              <b>{s.value}</b>
              <span className="small muted">{s.label}</span>
            </div>
          ))}
        </section>
      )}

      <div className="split">
        <article className="prose m-reveal">
          <h2 className="heading">What I worked on</h2>
          {e.writeup.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {e.documents && (
            <div className="row-wrap">
              {e.documents.map((d) => (
                <a key={d.href} className="gr-btn gr-btn--outline" href={d.href}>
                  <Icon name="file" size={16} />
                  <span>{d.title}</span>
                </a>
              ))}
            </div>
          )}
        </article>

        <aside className="section m-reveal" aria-labelledby="roles-title" style={{ gap: 16 }}>
          <h2 id="roles-title" className="title">
            {e.positions.length > 1 ? "Roles" : "Role"}
          </h2>
          <ol className="timeline">
            {e.positions.map((p) => (
              <li key={p.title}>
                <span aria-hidden="true" />
                <span>
                  <b>{p.title}</b>
                  <span className="caption">{[p.dates, p.location].filter(Boolean).join(" · ")}</span>
                  {p.summary && <span className="small muted">{p.summary}</span>}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </main>
  );
}
