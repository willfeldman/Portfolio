import Link from "next/link";
import { CardStack } from "@/components/CardStack";
import { HeroStage } from "@/components/HeroStage";
import { Icon } from "@/components/Icon";
import { PhotoStrip } from "@/components/PhotoStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { askStatus } from "@/lib/ask-budget";
import { experiences, projects, site } from "@/content/site";

// The hero picks Ask about Will or the card pile from the gateway's credit, checked at most
// every five minutes.
export const revalidate = 300;

const featured = ["supper", "mindprint", "classmate"].map((slug) => projects.find((p) => p.slug === slug)!);
const tilts = ["r", "l", "l"] as const;

export default async function Home() {
  const { available } = await askStatus();
  return (
    <>
      <main id="main" className="page">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <h1 id="hero-title" className="display-xl m-in" style={{ "--i": 0 } as React.CSSProperties}>
              Hi, I’m Will.
            </h1>
            <p className="subhead m-in" style={{ "--i": 1 } as React.CSSProperties}>
              {site.tagline}
            </p>
            <p className="lede m-in" style={{ "--i": 2 } as React.CSSProperties}>
              {site.intro}
            </p>
            <div className="row-wrap hero__actions m-in" style={{ "--i": 3 } as React.CSSProperties}>
              <Link className="gr-btn gr-btn--primary gr-btn--lg" href="/work">
                <span>Explore my work</span>
                <Icon name="arrowRight" />
              </Link>
              <a className="gr-btn gr-btn--secondary gr-btn--lg" href={site.resume}>
                <span>Resume</span>
                <Icon name="arrowUpRight" />
              </a>
            </div>
          </div>
          <HeroStage askAvailable={available} fallback={<CardStack />} />
        </section>

        <section className="section" aria-labelledby="exp-title">
          <div className="section-head">
            <h2 id="exp-title" className="heading">
              Where I’ve been building
            </h2>
            <Link className="gr-btn gr-btn--ghost" href="/work">
              <span>All experience</span>
              <Icon name="chevronRight" size={16} />
            </Link>
          </div>
          <div className="gr-list m-reveal">
            {experiences.slice(0, 3).map((e) => (
              <Link key={e.slug} className="gr-list__row row-lg" href={`/work/${e.slug}`}>
                <img className="logo logo--44" src={e.logo} alt="" />
                <span className="gr-list__text">
                  <span className="gr-list__title">{e.company}</span>
                  <span className="gr-list__desc">
                    {e.positions[0].title} · {e.range}
                  </span>
                </span>
                <Icon name="chevronRight" size={16} />
              </Link>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="proj-title">
          <div className="section-head">
            <h2 id="proj-title" className="heading">
              A few things I’ve made
            </h2>
            <Link className="gr-btn gr-btn--ghost" href="/projects">
              <span>All projects</span>
              <Icon name="chevronRight" size={16} />
            </Link>
          </div>
          <div className="card-grid card-grid--home">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} tilt={tilts[i]} headingLevel={3} />
            ))}
          </div>
        </section>
      </main>
      <PhotoStrip />
    </>
  );
}
