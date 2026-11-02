import { experiences, projects, site } from "@/content/site";

export type Source = { label: string; href: string; icon: string };
export type CannedAnswer = { question: string; chip: string; chunks: string[]; sources: Source[] };

const [settle, toast] = experiences;
const oldest = projects[projects.length - 1];
const me = site.memoji;

// Answers to the suggested questions are written ahead of time from the site's own data,
// so the first impression never spends AI credits. Only typed questions call the model.
export const cannedAnswers: CannedAnswer[] = [
  {
    question: "What is Will working on?",
    chip: "What’s he working on?",
    chunks: [
      `He co-founded ${settle.company}, `,
      "which helps public-sector revenue teams find and act on opportunities early. ",
      `Before that, he was a ${toast.positions[0].title} at ${toast.company}.`,
    ],
    sources: [
      { label: "usesettle.com", icon: settle.logo, href: settle.url! },
      { label: "willfeldman.com/work", icon: me, href: "/work" },
    ],
  },
  {
    question: "What has he built?",
    chip: "What has he built?",
    chunks: [
      `${projects.length} projects since high school, `,
      `from ${oldest.title} on the App Store in ${oldest.made} `,
      "to Supper, an AI cooking companion for iPhone, and MINDPRINT in 2026.",
    ],
    sources: [{ label: "willfeldman.com/projects", icon: me, href: "/projects" }],
  },
  {
    question: "How can I reach him?",
    chip: "How do I reach him?",
    chunks: [`The quickest way is email: ${site.email}. `, "He’s also on LinkedIn, ", "and on GitHub as willfeldman."],
    sources: [{ label: "willfeldman.com/contact", icon: me, href: "/contact" }],
  },
];

// Pages the model may cite, and how their chips look.
export function sourceFor(path: string): Source | null {
  const clean = path.trim().replace(/^https?:\/\/(www\.)?willfeldman\.com/, "").replace(/\.md$/, "") || "/";
  if (!clean.startsWith("/")) return null;
  const known = ["/", "/work", "/projects", "/about", "/contact", "/photos", "/privacy"];
  const ok =
    known.includes(clean) ||
    experiences.some((e) => clean === `/work/${e.slug}`) ||
    projects.some((p) => p.page && clean === p.href);
  if (!ok) return null;
  return { label: `willfeldman.com${clean === "/" ? "" : clean}`, href: clean, icon: me };
}
