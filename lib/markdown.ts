import { awards, education, experiences, organizations, photoCount, projects, site } from "@/content/site";
import { contactCopy, privacyCopy } from "@/content/pages";

// Markdown twins of every page, served for Accept: text/markdown and at <path>.md.
// They carry the same facts as the HTML, from the same content files.

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const link = (label: string, href: string) => `[${label}](${href.startsWith("/") ? url(href) : href})`;

function home() {
  const [settle, toast] = experiences;
  return [
    `# ${site.name}`,
    `> ${site.tagline} ${site.intro}`,
    `## Now`,
    `- ${settle.positions[0].title}, ${link(settle.company, settle.url!)} (${settle.range}). ${settle.summary}`,
    `- Previously ${toast.positions[0].title} at ${toast.company} (${toast.range}).`,
    `## Where I’ve been building`,
    ...experiences.slice(0, 3).map((e) => `- ${link(e.company, `/work/${e.slug}`)}: ${e.positions[0].title}, ${e.range}`),
    `## A few things I’ve made`,
    ...projects.slice(0, 3).map((p) => `- ${link(p.title, p.href)} (${p.made}): ${p.description}`),
    `## Pages`,
    `- ${link("Work", "/work")}: every role, with dates`,
    `- ${link("Projects", "/projects")}: ${projects.length} projects, dated`,
    `- ${link("About", "/about")}: bio, education, organizations and awards`,
    `- ${link("Photos", "/photos")}: ${photoCount} photos`,
    `- ${link("Contact", "/contact")}: email and links`,
  ].join("\n\n");
}

function experienceBlock(e: (typeof experiences)[number], depth = 2) {
  const h = "#".repeat(depth);
  const lines = [`${h} ${e.company}`, `${e.range} · ${e.location}`, e.summary];
  for (const p of e.positions) {
    lines.push(`${h}# ${p.title}`, [p.dates, p.location].filter(Boolean).join(" · "));
    if (p.summary) lines.push(p.summary);
    if (p.bullets.length) lines.push(p.bullets.map((b) => `- ${b}`).join("\n"));
  }
  return lines.join("\n\n");
}

function work() {
  return [
    `# Experience`,
    `> Product, technology, and the people who bring them together. Roles and dates for ${site.name}, newest first.`,
    `Resume: ${site.resume}`,
    ...experiences.map((e) => experienceBlock(e) + `\n\nMore: ${url(`/work/${e.slug}`)}`),
  ].join("\n\n");
}

function workDetail(slug: string) {
  const e = experiences.find((x) => x.slug === slug);
  if (!e) return null;
  const lines = [`# ${e.company}`, `> ${e.summary}`, `${e.range} · ${e.location}`];
  if (e.stats) lines.push(`## Highlights`, e.stats.map((s) => `- ${s.value}: ${s.label}`).join("\n"));
  lines.push(`## What I worked on`, ...e.writeup);
  lines.push(`## Roles`);
  for (const p of e.positions) {
    lines.push(`### ${p.title}`, [p.dates, p.location].filter(Boolean).join(" · "));
    if (p.summary) lines.push(p.summary);
    if (p.bullets.length) lines.push(p.bullets.map((b) => `- ${b}`).join("\n"));
  }
  if (e.documents) lines.push(`## Documents`, e.documents.map((d) => `- ${link(d.title, d.href)}`).join("\n"));
  const links = [e.url && link("Website", e.url), e.linkedin && link("LinkedIn", e.linkedin)].filter(Boolean);
  if (links.length) lines.push(`## Links`, links.map((l) => `- ${l}`).join("\n"));
  lines.push(`Back to ${link("all experience", "/work")}.`);
  return lines.join("\n\n");
}

function projectsPage() {
  return [
    `# Projects`,
    `> Experiments, side projects, and things built to be useful. ${projects.length} projects by ${site.name}, newest first. "Pre-ChatGPT" marks work made before ChatGPT launched on Nov. 30, 2022.`,
    ...projects.map((p) =>
      [
        `## ${p.title}`,
        `Made: ${p.made}${p.preGpt ? " (pre-ChatGPT)" : ""} · Tags: ${p.tags.join(", ")}`,
        p.description,
        ...(p.writeup ?? []),
        `Link: ${p.href.startsWith("/") ? url(p.href) : p.href}`,
      ].join("\n\n"),
    ),
  ].join("\n\n");
}

function projectDetail(slug: string) {
  const p = projects.find((x) => x.slug === slug && x.page);
  if (!p) return null;
  return [
    `# ${p.title}`,
    `> ${p.description}`,
    `Made: ${p.made} · Tags: ${p.tags.join(", ")}`,
    `## About the project`,
    ...(p.writeup ?? []),
    `Back to ${link("all projects", "/projects")}.`,
  ].join("\n\n");
}

function about() {
  return [
    `# ${site.name}`,
    `> ${site.intro}`,
    `- Building: ${experiences[0].company}`,
    `- Background: Computer science and business`,
    `- Also into: Photography and making things`,
    `## Education`,
    ...education.map((e) => `- **${e.school}**: ${e.degree}, ${e.years}. ${e.honors.join(", ")}.`),
    `## Organizations`,
    ...organizations.map((o) =>
      [`### ${o.name}`, `${o.years}. ${o.summary}`, o.roles.map((r) => `- ${r.title}, ${r.years}`).join("\n")].join("\n\n"),
    ),
    `## Awards and recognition`,
    ...awards.map((a) => `- **${a.name}**, ${a.issuer}, ${a.date}: ${a.detail}.`),
    `## Photos`,
    `${photoCount} of Will’s photos are at ${url("/photos")}.`,
  ].join("\n\n");
}

function contact() {
  return [`# Contact`, `> ${contactCopy.lede}`, ...contactCopy.body, `## Ways to reach Will`, ...contactCopy.links.map((l) => `- ${l.label}: ${l.value} (${l.href})`)].join("\n\n");
}

function privacy() {
  return [`# Privacy`, `> ${privacyCopy.lede}`, ...privacyCopy.sections.flatMap((s) => [`## ${s.title}`, ...s.body])].join("\n\n");
}

function photos() {
  return [`# Photos`, `> ${photoCount} photos taken by ${site.name}.`, `The images are at ${url("/src/ig/1.webp")} through ${url(`/src/ig/${photoCount}.webp`)}.`].join("\n\n");
}

export function markdownFor(path: string): string | null {
  const p = ("/" + path).replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  if (p === "/") return home();
  if (p === "/work") return work();
  if (p === "/projects") return projectsPage();
  if (p === "/about") return about();
  if (p === "/contact") return contact();
  if (p === "/privacy") return privacy();
  if (p === "/photos") return photos();
  const w = p.match(/^\/work\/([a-z0-9-]+)$/);
  if (w) return workDetail(w[1]);
  const pr = p.match(/^\/projects\/([a-z0-9-]+)$/);
  if (pr) return projectDetail(pr[1]);
  return null;
}

export const notFoundMarkdown = [
  `# Page not found`,
  `There is no page at this address on ${site.url}. These are the main pages:`,
  [
    `- ${link("Home", "/")}`,
    `- ${link("Work", "/work")}`,
    `- ${link("Projects", "/projects")}`,
    `- ${link("About", "/about")}`,
    `- ${link("Contact", "/contact")}`,
    `- ${link("llms.txt", "/llms.txt")}`,
  ].join("\n"),
].join("\n\n");

export function llmsTxt() {
  const [settle, toast] = experiences;
  return [
    `# ${site.name}`,
    `> ${settle.positions[0].title} of Settle, which helps established public-sector (SLED) revenue teams identify and act on opportunities early. Previously ${toast.positions[0].title} at Toast. Based in ${site.location}.`,
    `## When to use this site`,
    `Use willfeldman.com for first-party facts about Will Feldman: his roles and their dates, the projects he has made and when, his education, and how to reach him. Every page is available as Markdown by sending Accept: text/markdown or adding .md to the path. The full site in one file is at ${url("/llms-full.txt")}.`,
    `## Pages`,
    [
      `- ${link("Home", "/")}: summary and current work`,
      `- ${link("Work", "/work")}: every role, with dates`,
      ...experiences.map((e) => `- ${link(e.company, `/work/${e.slug}`)}: ${e.positions[0].title}, ${e.range}`),
      `- ${link("Projects", "/projects")}: ${projects.length} projects, dated`,
      ...projects.filter((p) => p.page).map((p) => `- ${link(p.title, p.href)}: ${p.description}`),
      `- ${link("About", "/about")}: bio, education, organizations and awards`,
      `- ${link("Photos", "/photos")}: ${photoCount} photos`,
      `- ${link("Contact", "/contact")}: email and links`,
      `- ${link("Privacy", "/privacy")}: what the site collects`,
    ].join("\n"),
    `## Contact`,
    [`- Email: ${site.email}`, `- LinkedIn: ${site.linkedin}`, `- GitHub: ${site.github}`].join("\n"),
  ].join("\n\n");
}

export function llmsFull() {
  const pages = ["/", "/work", ...experiences.map((e) => `/work/${e.slug}`), "/projects", "/projects/classmate", "/about", "/contact"];
  return pages.map((p) => `<!-- ${url(p)} -->\n\n${markdownFor(p)}`).join("\n\n---\n\n");
}
