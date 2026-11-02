import Link from "next/link";
import { type Project, tagClass } from "@/content/site";

export function ProjectCard({
  project: p,
  tilt,
  headingLevel = 2,
}: {
  project: Project;
  tilt?: "l" | "r";
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const internal = p.href.startsWith("/");
  const body = (
    <>
      <div className="gr-card__media card-media">
        <img
          className={`shot ${p.portrait ? "shot--portrait" : "shot--landscape"}${tilt ? ` tilt-${tilt}` : ""}`}
          src={p.image}
          alt={p.alt}
          loading="lazy"
        />
        <span className="card-pills">
          <span className="pill">{p.made}</span>
          {p.preGpt && (
            <span className="pill pill--quiet" title="Made before ChatGPT launched on Nov. 30, 2022">
              Pre-ChatGPT<span aria-hidden="true"> 🤯</span>
            </span>
          )}
        </span>
      </div>
      <div className="card-tags">
        {p.tags.map((t) => (
          <span key={t} className={`gr-badge ${tagClass(t)}`}>
            {t}
          </span>
        ))}
      </div>
      <Heading className="gr-card__title">{p.title}</Heading>
      <p className="card-desc">{p.description}</p>
    </>
  );
  return internal ? (
    <Link className="gr-card m-reveal" href={p.href}>
      {body}
    </Link>
  ) : (
    <a className="gr-card m-reveal" href={p.href}>
      {body}
    </a>
  );
}
