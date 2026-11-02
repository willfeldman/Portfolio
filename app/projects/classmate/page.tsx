import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { projects, tagClass } from "@/content/site";

const project = projects.find((p) => p.slug === "classmate")!;
const index = projects.indexOf(project);
const [newer, older] = [projects[index - 1], projects[index + 1]];
const demo = "https://drive.google.com/file/d/1b05NkqELtTbR-YZE8eeH2Ap7Cl-CHLhb/view?usp=sharing";

export const metadata: Metadata = {
  title: "Classmate",
  description: `${project.description} An iOS app by Will Feldman, ${project.made}.`,
  alternates: { canonical: "/projects/classmate", types: { "text/markdown": "/projects/classmate.md" } },
};

const screens = [
  { src: "/img/projects/classmate-phone-1.png", name: "Home", text: "The next class and upcoming assignments at a glance.", bg: "var(--editorial-yellow)" },
  { src: "/img/projects/classmate-phone-2.png", name: "Assignments", text: "Every assignment with its due date and status.", bg: "var(--editorial-purple)" },
  { src: "/img/projects/classmate-phone-3.png", name: "Classes", text: "The weekly class schedule, grouped by day.", bg: "var(--editorial-green)" },
];

const pagerHref = (p: (typeof projects)[number]) => p.href;

export default function Classmate() {
  return (
    <main id="main" className="page page--detail" style={{ gap: 40 }}>
      <Link className="gr-btn gr-btn--ghost back-link" href="/projects">
        <Icon name="arrowLeft" size={16} />
        <span>All projects</span>
      </Link>

      <header className="m-in" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
          <div className="row-wrap" style={{ gap: 6 }}>
            {project.tags.map((t) => (
              <span key={t} className={`gr-badge ${tagClass(t)}`}>
                {t}
              </span>
            ))}
          </div>
          <div className="cm-title">
            <img src="/img/projects/classmate-icon.png" alt="Classmate app icon" />
            <h1 className="display-lg">Classmate</h1>
          </div>
          <p className="lede" style={{ maxWidth: 640, fontSize: 20, lineHeight: "28px" }}>
            {project.description}
          </p>
        </div>
        <a className="gr-btn gr-btn--primary gr-btn--lg" href={demo}>
          <Icon name="play" size={16} />
          <span>Watch the demo</span>
        </a>
      </header>

      <figure className="cm-stage" aria-label="Classmate’s Home, Assignments and Classes screens">
        <svg aria-hidden="true" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <circle cx="120" cy="110" r="70" fill="#f6c543" />
          <rect x="820" y="60" width="150" height="56" rx="28" fill="#ffffff" opacity="0.9" />
          <circle cx="900" cy="420" r="110" fill="#3a83f7" />
          <rect x="40" y="360" width="200" height="56" rx="28" fill="#8952ee" />
        </svg>
        <div className="cm-phones">
          <img className="cm-phone cm-left m-rise" src={screens[1].src} alt="Assignments screen" style={{ "--i": 3 } as React.CSSProperties} />
          <img className="cm-phone cm-center m-rise" src={screens[0].src} alt="Home screen with upcoming assignments" style={{ "--i": 2 } as React.CSSProperties} />
          <img className="cm-phone cm-right m-rise" src={screens[2].src} alt="Classes screen" style={{ "--i": 4 } as React.CSSProperties} />
        </div>
      </figure>

      <div className="split">
        <article className="prose">
          <h2 className="heading">About the project</h2>
          {project.writeup!.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </article>
        <aside className="spec">
          {[
            ["Platform", "iOS"],
            ["Built with", "Xcode"],
            ["Made", project.made],
            ["Type", "Personal project"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="caption">{k}</p>
              <p>{v}</p>
            </div>
          ))}
        </aside>
      </div>

      <section className="section" aria-labelledby="screens-title">
        <h2 id="screens-title" className="heading">
          Inside the app
        </h2>
        <div className="tiles">
          {screens.map((s) => (
            <figure key={s.name} className="tile m-reveal">
              <div className="tile__frame" style={{ background: s.bg }}>
                <img src={s.src} alt={`${s.name} screen`} loading="lazy" />
              </div>
              <figcaption>
                <span style={{ fontSize: 16, lineHeight: "24px", fontWeight: 500 }}>{s.name}</span>
                <span className="small muted">{s.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <nav className="pager" aria-label="More projects">
        {newer && (
          <a href={pagerHref(newer)}>
            <span className="caption">Newer</span>
            <span className="title">{newer.title}</span>
          </a>
        )}
        {older && (
          <a href={pagerHref(older)}>
            <span className="caption">Older</span>
            <span className="title">{older.title}</span>
          </a>
        )}
      </nav>
    </main>
  );
}
