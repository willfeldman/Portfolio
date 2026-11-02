import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { experiences, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Every role ${site.name} has held, with dates: Settle, Toast, Blueport Commerce and earlier.`,
  alternates: { canonical: "/work", types: { "text/markdown": "/work.md" } },
};

export default function Work() {
  return (
    <main id="main" className="page page--tight">
      <header className="page-head m-in">
        <h1 className="display-lg">Experience</h1>
        <p className="lede">Product, technology, and the people who bring them together.</p>
      </header>

      <div className="row-wrap">
        <a className="gr-btn gr-btn--outline" href={site.resume}>
          <span>Download resume</span>
          <Icon name="arrowUpRight" size={16} />
        </a>
      </div>

      <div>
        {experiences.map((job) => (
          <article key={job.slug} className="job m-reveal">
            <div className="job__when">
              <b>{job.range}</b>
              <span className="caption">{job.location}</span>
            </div>
            <div className="job__body">
              <div className="job__head">
                <img className="logo logo--48" src={job.logo} alt="" />
                <h2 className="title">{job.company}</h2>
                <Link className="gr-btn gr-btn--ghost" href={`/work/${job.slug}`} aria-label={`Read more about ${job.company}`}>
                  <span>Read more</span>
                  <Icon name="chevronRight" size={16} />
                </Link>
              </div>
              {job.positions.map((pos) => (
                <div key={pos.title} className="position">
                  <div className="position__head">
                    <h3>{pos.title}</h3>
                    <span className="caption">{pos.dates}</span>
                  </div>
                  {pos.bullets.length > 0 && (
                    <ul className="bullets">
                      {pos.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
