import type { Metadata } from "next";
import { PhotoStrip } from "@/components/PhotoStrip";
import { awards, education, experiences, organizations, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: background, education at Northeastern University, organizations, awards and photos.`,
  alternates: { canonical: "/about", types: { "text/markdown": "/about.md" } },
};

export default function About() {
  const facts = [
    ["Building", experiences[0].company],
    ["Background", "Computer science & business"],
    ["Also into", "Photography & making things"],
  ];
  return (
    <>
      <main id="main" className="page">
        <section className="about-hero" aria-labelledby="about-title">
          <img className="m-in" src={site.portrait} alt="Portrait of Will Feldman" style={{ "--i": 0 } as React.CSSProperties} />
          <div className="about-hero__text m-in" style={{ "--i": 2 } as React.CSSProperties}>
            <h1 id="about-title" className="display-lg">
              {site.name}
            </h1>
            <p className="lede">{site.intro}</p>
            <dl className="facts">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="edu-title">
          <h2 id="edu-title" className="heading">
            Education
          </h2>
          <div className="gr-list m-reveal">
            {education.map((e) => (
              <div key={e.school} className="gr-list__row row-lg row-edu">
                <img className="logo logo--48" src={e.logo} alt="" />
                <span className="gr-list__text">
                  <span className="gr-list__title">{e.school}</span>
                  <span className="gr-list__desc">
                    {e.degree} · {e.years}
                  </span>
                </span>
                <span className="row-wrap" style={{ gap: 6 }}>
                  {e.honors.map((h) => (
                    <span key={h} className="gr-badge">
                      {h}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="org-title">
          <h2 id="org-title" className="heading">
            Organizations
          </h2>
          <div className="org-grid">
            {organizations.map((o) => (
              <article key={o.name} className="org m-reveal">
                <div className="org__head">
                  <img className="logo logo--44" src={o.logo} alt="" />
                  <div style={{ minWidth: 0 }}>
                    <h3>{o.name}</h3>
                    <p>{o.years}</p>
                  </div>
                </div>
                <p className="small muted" style={{ margin: 0 }}>
                  {o.summary}
                </p>
                <ul className="roles">
                  {o.roles.map((r) => (
                    <li key={r.title}>
                      <span>{r.title}</span>
                      <span>{r.years}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="award-title">
          <h2 id="award-title" className="heading">
            Awards &amp; recognition
          </h2>
          <div className="gr-list m-reveal">
            {awards.map((a) => (
              <div key={a.name} className="gr-list__row row-lg row-award">
                <span className="gr-list__text">
                  <span className="gr-list__title">{a.name}</span>
                  <span className="gr-list__desc">
                    {a.issuer} · {a.detail}
                  </span>
                </span>
                <span className="gr-list__meta" style={{ paddingTop: 2 }}>
                  {a.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <PhotoStrip />
    </>
  );
}
