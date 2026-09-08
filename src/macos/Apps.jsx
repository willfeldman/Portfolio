import React, { useEffect, useRef, useState } from "react";
import { Icon, AppIcon } from "./Icons";
import {
  projects,
  experiences,
  educations,
  awards,
  organizations,
  info,
  localAsset,
  sections,
  photoIds,
} from "./content";

export function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      className={`external-link ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <Icon name="external" size={14} />
    </a>
  );
}

function ProjectCard({ project, open }) {
  return (
    <button
      className="project-card"
      onClick={() => open("detail", { kind: "project", item: project })}
    >
      <div className={`project-image project-${project.id}`}>
        <img src={project.images[0]} alt="" loading="lazy" />
      </div>
      <div className="project-card-info">
        <strong>{project.title}</strong>
        <span>
          {project.tags
            .filter(Boolean)
            .slice(0, 2)
            .map((t) => t.name)
            .join(" · ")}
        </span>
      </div>
    </button>
  );
}

export function Finder({ section, setSection, open }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  useEffect(() => setQuery(""), [section]);
  const selected = sections.find((s) => s.id === section) || sections[0];
  const filteredProjects = [...projects]
    .reverse()
    .filter((p) =>
      `${p.title} ${p.description} ${p.tags.map((t) => t?.name).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  return (
    <div className="finder-layout">
      <aside className="finder-sidebar" aria-label="Portfolio sections">
        <div className="sidebar-label">Favorites</div>
        {sections.map((s) => (
          <button
            className={section === s.id ? "selected" : ""}
            key={s.id}
            onClick={() => setSection(s.id)}
          >
            <Icon name={s.icon} size={17} />
            <span>{s.name}</span>
          </button>
        ))}
        <div className="sidebar-label spaced">Personal</div>
        <button onClick={() => open("photos")}>
          <Icon name="photo" size={17} />
          Photos
        </button>
        <button onClick={() => open("resume")}>
          <Icon name="document" size={17} />
          Résumé
        </button>
        <button onClick={() => open("contact")}>
          <Icon name="mail" size={17} />
          Get in touch
        </button>
        <div className="sidebar-label spaced">On the web</div>
        <ExternalLink href={info.gitHub}>
          <Icon name="github" size={16} />
          GitHub
        </ExternalLink>
        <ExternalLink href={info.linkedIn}>
          <Icon name="linkedin" size={16} />
          LinkedIn
        </ExternalLink>
        <div className="sidebar-user">
          <img src="/src/will_emoji.png" alt="" />
          <span>
            Will Feldman<small>Personal workspace</small>
          </span>
        </div>
      </aside>
      <div className="finder-main">
        <div className="finder-toolbar">
          <div className="toolbar-location">
            <Icon name={selected.icon} size={17} />
            <strong>{selected.name}</strong>
          </div>
          <div className="toolbar-actions">
            {section === "projects" && (
              <>
                <button
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  <Icon name="grid" />
                </button>
                <button
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <Icon name="list" />
                </button>
              </>
            )}
            <button
              aria-label="Search portfolio"
              onClick={() => open("spotlight")}
            >
              <Icon name="search" />
            </button>
          </div>
        </div>
        <div className="mobile-sections">
          <label className="sr-only" htmlFor="portfolio-section">
            Portfolio section
          </label>
          <select
            id="portfolio-section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="finder-scroll" key={section}>
          {section === "home" && (
            <>
              <div className="welcome-hero">
                <div className="welcome-copy">
                  <h1>Hi, I’m Will.</h1>
                  <p>
                    A product person.
                    <br />A builder at heart.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => setSection("experience")}
                  >
                    Explore my work <Icon name="arrow" size={16} />
                  </button>
                </div>
                <div className="memoji-scene">
                  <span className="memoji-halo" />
                  <img src="/src/will_emoji.png" alt="Will’s smiling Memoji" />
                  <span className="hello-sticker">hello!</span>
                </div>
              </div>
              <div className="section-heading">
                <h2>Where I’ve been building</h2>
                <button onClick={() => setSection("experience")}>
                  All experience <Icon name="next" size={13} />
                </button>
              </div>
              <div className="featured-experience">
                {[7, 6].map((id) => {
                  const item = experiences.find((e) => e.id === id);
                  const role = item.positions[item.positions.length - 1];
                  return (
                    <button
                      key={id}
                      onClick={() =>
                        open("detail", { kind: "experience", item })
                      }
                    >
                      <img src={localAsset(item.logo)} alt="" />
                      <span>
                        <strong>{item.company}</strong>
                        <small>{role.title}</small>
                      </span>
                      <Icon name="next" size={16} />
                    </button>
                  );
                })}
              </div>
              <div className="section-heading">
                <h2>A few things I’ve made</h2>
                <button onClick={() => setSection("projects")}>
                  All projects <Icon name="next" size={13} />
                </button>
              </div>
              <div className="project-grid selected-projects">
                {[9, 10, 3].map((id) => (
                  <ProjectCard
                    key={id}
                    project={projects.find((p) => p.id === id)}
                    open={open}
                  />
                ))}
              </div>
              <div className="welcome-footer">
                <span>
                  <Icon name="heart" size={13} /> Curiosity, made tangible.
                </span>
                <button onClick={() => open("contact")}>
                  Let’s say hello <Icon name="arrow" size={14} />
                </button>
              </div>
            </>
          )}
          {section === "projects" && (
            <>
              <div className="page-intro">
                <span className="eyebrow">IDEAS INTO REAL THINGS</span>
                <h1>Projects</h1>
                <p>
                  Experiments, side projects, and things built to be useful.
                </p>
              </div>
              <label className="inline-search">
                <Icon name="search" size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter projects…"
                  aria-label="Filter projects"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear project filter"
                  >
                    <Icon name="close" size={14} />
                  </button>
                )}
              </label>
              <div
                className={`project-grid ${view === "list" ? "list-view" : ""}`}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} open={open} />
                ))}
              </div>
              {!filteredProjects.length && (
                <p className="empty-state">
                  No projects match “{query}”. Try a different name or
                  technology.
                </p>
              )}
            </>
          )}
          {section === "experience" && (
            <>
              <div className="page-intro">
                <span className="eyebrow">THE JOURNEY SO FAR</span>
                <h1>Experience</h1>
                <p>
                  Product, technology, and the people who bring them together.
                </p>
              </div>
              <div className="experience-list">
                {[...experiences].reverse().map((item) => {
                  const role = item.positions[item.positions.length - 1];
                  return (
                    <button
                      className="experience-row"
                      key={item.id}
                      onClick={() =>
                        open("detail", { kind: "experience", item })
                      }
                    >
                      <img src={localAsset(item.logo)} alt="" loading="lazy" />
                      <span className="experience-text">
                        <span className="company-line">
                          <strong>{item.company}</strong>
                          <small>{item.fullDates || role.dates}</small>
                        </span>
                        <b>{role.title}</b>
                        <span>{role.summary || role.description[0]}</span>
                      </span>
                      <Icon name="next" size={16} />
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {section === "education" && (
            <>
              <div className="page-intro">
                <span className="eyebrow">ALWAYS LEARNING</span>
                <h1>Education</h1>
              </div>
              <div className="education-list">
                {[...educations].reverse().map((item) => (
                  <article key={item.id}>
                    <img src={localAsset(item.logo)} alt="" />
                    <h2>{item.school}</h2>
                    <p>{item.subtitle}</p>
                    <div className="tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
          {section === "awards" && (
            <>
              <div className="page-intro">
                <span className="eyebrow">ALONG THE WAY</span>
                <h1>Awards & recognition</h1>
              </div>
              {[...awards].reverse().map((item) => (
                <button
                  key={item.id}
                  className="recognition-row"
                  onClick={() => open("detail", { kind: "award", item })}
                >
                  <span className="award-medal">
                    <Icon name="award" size={26} />
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>
                      {item.issuer} · {item.date}
                    </small>
                  </span>
                  <Icon name="next" size={16} />
                </button>
              ))}
            </>
          )}
          {section === "organizations" && (
            <>
              <div className="page-intro">
                <span className="eyebrow">BETTER TOGETHER</span>
                <h1>Organizations</h1>
              </div>
              {[...organizations].reverse().map((item) => (
                <button
                  key={item.id}
                  className="experience-row"
                  onClick={() => open("detail", { kind: "organization", item })}
                >
                  <img src={localAsset(item.logo)} alt="" />
                  <span className="experience-text">
                    <strong>{item.name}</strong>
                    <b>{item.role[0].title}</b>
                    <span>{item.summary}</span>
                  </span>
                  <Icon name="next" size={16} />
                </button>
              ))}
            </>
          )}
        </div>
        <footer className="finder-status">
          <span>
            <Icon name="home" size={12} /> Will Feldman{" "}
            <Icon name="next" size={11} /> {selected.name}
          </span>
        </footer>
      </div>
    </div>
  );
}

export function Detail({ data, open }) {
  const [imageIndex, setImageIndex] = useState(0);
  const { item, kind } = data;
  useEffect(() => setImageIndex(0), [item]);
  return (
    <article className="detail-page">
      <span className="eyebrow">{kind}</span>
      <h1>{item.title || item.company || item.name}</h1>
      {kind === "project" && (
        <>
          <p className="detail-description">{item.description}</p>
          <div className="tags">
            {item.tags.filter(Boolean).map((t) => (
              <span key={t.name}>{t.name}</span>
            ))}
          </div>
          <div className="detail-links">
            {item.github && (
              <ExternalLink href={item.github}>
                <Icon name="github" />
                View source
              </ExternalLink>
            )}
            {item.url && (
              <ExternalLink href={item.url}>View project</ExternalLink>
            )}
            {item.code && (
              <ExternalLink href={item.code}>View code</ExternalLink>
            )}
          </div>
          <button
            className="project-preview"
            aria-label={`Enlarge ${item.title} image ${imageIndex + 1}`}
            onClick={() =>
              open("preview", {
                src: item.images[imageIndex],
                title: `${item.title} — ${imageIndex + 1}`,
              })
            }
          >
            <img
              src={item.images[imageIndex]}
              alt={`${item.title} screenshot ${imageIndex + 1}`}
            />
          </button>
          <div className="image-thumbnails">
            {item.images.map((src, i) => (
              <button
                key={src}
                className={i === imageIndex ? "selected" : ""}
                onClick={() => setImageIndex(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-pressed={i === imageIndex}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </>
      )}
      {kind === "experience" && (
        <>
          <div className="detail-company">
            <img src={localAsset(item.logo)} alt="" />
            <span>{item.location}</span>
          </div>
          <div className="detail-links">
            {(Array.isArray(item.url) ? item.url : [item.url])
              .filter(Boolean)
              .map((url) => (
                <ExternalLink key={url} href={url}>
                  Company website
                </ExternalLink>
              ))}
          </div>
          {[...item.positions].reverse().map((role) => (
            <section className="role-detail" key={role.title}>
              <h2>{role.title}</h2>
              <p className="muted">
                {role.dates} · {role.type}
              </p>
              <ul>
                {role.description.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
      {kind === "organization" && (
        <>
          <p>{item.summary}</p>
          {item.role.map((role) => (
            <section key={role.title} className="role-detail">
              <h2>{role.title}</h2>
              <p className="muted">{role.years}</p>
            </section>
          ))}
          <ul>
            {item.description.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </>
      )}
      {kind === "award" && (
        <>
          <p>
            {item.issuer} · {item.date}
          </p>
          <div
            className="rich-content"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </>
      )}
      {item.additionalInformation && (
        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: item.additionalInformation }}
        />
      )}
    </article>
  );
}

export function Photos({ open }) {
  const [limit, setLimit] = useState(30);
  return (
    <div className="photos-app">
      <div className="photos-heading">
        <div>
          <h1>Life, in frames.</h1>
          <p>A few moments from my camera roll.</p>
        </div>
        <span>{photoIds.length} photos</span>
      </div>
      <div className="photo-grid">
        {photoIds.slice(0, limit).map((id, i) => (
          <button
            key={id}
            onClick={() =>
              open("preview", {
                src: `/src/ig/${id}.webp`,
                title: `Photo ${photoIds.length - i}`,
                photoIndex: i,
              })
            }
            aria-label={`Open photo ${photoIds.length - i}`}
          >
            <img
              loading="lazy"
              src={`/src/ig/${id}.webp`}
              alt={`From Will’s collection, ${photoIds.length - i}`}
            />
          </button>
        ))}
      </div>
      {limit < photoIds.length && (
        <button
          className="secondary-button load-photos"
          onClick={() => setLimit((n) => n + 30)}
        >
          Show more photos
        </button>
      )}
      <p className="photo-count">
        {Math.min(limit, photoIds.length)} of {photoIds.length} photos
      </p>
    </div>
  );
}

export function Preview({ data, active }) {
  const [index, setIndex] = useState(data.photoIndex);
  useEffect(() => setIndex(data.photoIndex), [data]);
  const isPhoto = Number.isInteger(index);
  useEffect(() => {
    const handle = (e) => {
      if (!isPhoto || !active) return;
      if (e.key === "ArrowLeft")
        setIndex((i) => (i + photoIds.length - 1) % photoIds.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photoIds.length);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isPhoto, active]);
  return (
    <div className="preview-app">
      <img
        src={isPhoto ? `/src/ig/${photoIds[index]}.webp` : data.src}
        alt={
          isPhoto
            ? `Photo ${photoIds[index]} from Will’s collection`
            : data.title
        }
      />
      {isPhoto && (
        <div className="preview-controls">
          <button
            aria-label="Previous photo"
            onClick={() =>
              setIndex((i) => (i + photoIds.length - 1) % photoIds.length)
            }
          >
            <Icon name="back" />
          </button>
          <span>
            {index + 1} / {photoIds.length}
          </span>
          <button
            aria-label="Next photo"
            onClick={() => setIndex((i) => (i + 1) % photoIds.length)}
          >
            <Icon name="next" />
          </button>
        </div>
      )}
    </div>
  );
}

export function About({ open }) {
  return (
    <div className="about-app">
      <div className="about-avatar">
        <img src="/src/will_emoji.png" alt="Will’s Memoji" />
      </div>
      <span className="eyebrow">THE PERSON BEHIND THE WINDOWS</span>
      <h1>Will Feldman</h1>
      <p className="about-subtitle">Product. Code. A little curiosity.</p>
      <p>
        I work at the intersection of product, design, and technology — from
        building at Settle to turning side-project ideas into something you can
        use.
      </p>
      <div className="about-facts">
        <div>
          <span>Building</span>
          <strong>Settle</strong>
        </div>
        <div>
          <span>Background</span>
          <strong>Computer science & business</strong>
        </div>
        <div>
          <span>Also into</span>
          <strong>Photography & making things</strong>
        </div>
      </div>
      <button className="primary-button" onClick={() => open("contact")}>
        Say hello <Icon name="arrow" size={16} />
      </button>
      <small className="about-version">
        Will’s workspace · Portfolio edition
      </small>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(info.email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <div className="contact-app">
      <div className="mail-envelope">
        <Icon name="mail" size={54} />
      </div>
      <span className="eyebrow">GOOD THINGS START WITH A HELLO</span>
      <h1>Let’s talk.</h1>
      <p>
        Have something in mind, or just want to connect?
        <br />
        My inbox is open.
      </p>
      <div className="contact-address">
        <a href={`mailto:${info.email}`}>{info.email}</a>
        <button
          aria-label={copied ? "Email copied" : "Copy email address"}
          onClick={copy}
        >
          <Icon name={copied ? "check" : "copy"} />
        </button>
      </div>
      <a className="primary-button" href={`mailto:${info.email}`}>
        Write an email <Icon name="arrow" size={16} />
      </a>
      <span className="mail-helper">Opens in your email app</span>
      <div className="contact-socials">
        <ExternalLink href={info.linkedIn}>
          <Icon name="linkedin" />
          LinkedIn
        </ExternalLink>
        <ExternalLink href={info.gitHub}>
          <Icon name="github" />
          GitHub
        </ExternalLink>
      </div>
      <span className="copy-status" role="status">
        {copied
          ? "Email address copied."
          : copyError
          ? "Select the address above to copy it."
          : ""}
      </span>
    </div>
  );
}

export function Resume() {
  return (
    <div className="resume-app">
      <div className="resume-paper">
        <div className="resume-monogram">WF</div>
        <span className="eyebrow">RÉSUMÉ</span>
        <h1>Will Feldman</h1>
        <p>Product management · Technology · Entrepreneurship</p>
        <div className="resume-divider" />
        <p>
          Experience at Settle, Toast, and Blueport Commerce.
          <br />
          Computer Science and Business Administration at Northeastern
          University.
        </p>
        <ExternalLink className="primary-button" href={info.resume}>
          Open résumé
        </ExternalLink>
        <small>View the document on Google Drive.</small>
      </div>
    </div>
  );
}

export function Terminal({ open, setSection }) {
  const [lines, setLines] = useState([
    {
      output:
        "Welcome to Will’s workspace.\nType “help” to see what you can explore.",
    },
  ]);
  const [command, setCommand] = useState("");
  const bottom = useRef(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);
  const run = (e) => {
    e.preventDefault();
    const input = command.trim();
    if (!input) return;
    setCommand("");
    const [cmd, ...args] = input.toLowerCase().split(/\s+/);
    let output = "";
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "help")
      output =
        "Available commands:\n  whoami          A little about Will\n  ls              Explore the workspace\n  open <app>      projects, experience, photos, about, contact, resume\n  date            The time, right now\n  clear           A fresh start";
    else if (cmd === "whoami")
      output = `${info.name}\nCo-Founder & Head of Product at Settle\nBuilder. Product person. Photographer.\n${info.email}`;
    else if (cmd === "ls")
      output =
        "projects/   experience/   photos/   about/   contact/   resume.pdf";
    else if (cmd === "date") output = new Date().toLocaleString();
    else if (cmd === "open") {
      const target = args.join(" ").replace("/", "").replace(".pdf", "");
      if (["projects", "experience"].includes(target)) {
        setSection(target);
        open("finder");
        output = `Opening ${target}…`;
      } else if (["photos", "about", "contact", "resume"].includes(target)) {
        open(target);
        output = `Opening ${target}…`;
      } else
        output =
          "Try: open projects, experience, photos, about, contact, or resume";
    } else
      output = `Command not found: ${cmd}. Type “help” for available commands.`;
    setLines((current) => [...current, { input, output }]);
  };
  return (
    <div className="terminal-app">
      <div className="terminal-session">
        will@portfolio — personal workspace
      </div>
      {lines.map((line, i) => (
        <div key={i}>
          {line.input && (
            <div>
              <span className="terminal-prompt">will@portfolio ~ % </span>
              {line.input}
            </div>
          )}
          <pre>{line.output}</pre>
        </div>
      ))}
      <form onSubmit={run}>
        <label htmlFor="terminal-command" className="terminal-prompt">
          will@portfolio ~ %
        </label>
        <input
          id="terminal-command"
          aria-label="Terminal command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
      </form>
      <div ref={bottom} />
    </div>
  );
}

export function Settings({ theme, setTheme, wallpaper, setWallpaper }) {
  return (
    <div className="settings-app">
      <AppIcon app="settings" />
      <h1>Make yourself at home.</h1>
      <p>A few little ways to make this desktop yours.</p>
      <section>
        <h2>Appearance</h2>
        <div className="appearance-options">
          {["light", "dark", "auto"].map((value) => (
            <button
              key={value}
              className={theme === value ? "selected" : ""}
              aria-pressed={theme === value}
              onClick={() => setTheme(value)}
            >
              <span className={`appearance-preview ${value}`}>
                <i />
                <i />
              </span>
              <span>
                {value === "auto"
                  ? "System"
                  : value[0].toUpperCase() + value.slice(1)}
              </span>
              {theme === value && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2>Wallpaper</h2>
        <div className="wallpaper-options">
          {[
            ["sunset", "Daybreak"],
            ["blue", "Blue hour"],
            ["studio", "The studio"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={wallpaper === id ? "selected" : ""}
              aria-pressed={wallpaper === id}
              onClick={() => setWallpaper(id)}
            >
              <span className={`wallpaper-swatch swatch-${id}`} />
              <span>{label}</span>
              {wallpaper === id && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      </section>
      <p className="settings-note">Your preferences stay in this browser.</p>
    </div>
  );
}
