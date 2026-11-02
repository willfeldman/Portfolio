import type { Metadata } from "next";
import { ProjectSearch } from "@/components/ProjectSearch";
import { JsonLd, projectsLd } from "@/lib/structured-data";
import { projects, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `${projects.length} projects by ${site.name}, from Succulent Emojis in 2018 to Supper and MINDPRINT in 2026.`,
  alternates: { canonical: "/projects", types: { "text/markdown": "/projects.md" } },
};

export default function Projects() {
  return (
    <main id="main" className="page page--tight">
      <header className="page-head m-in">
        <h1 className="display-lg">Projects</h1>
        <p className="lede">Experiments, side projects, and things built to be useful.</p>
      </header>
      <ProjectSearch />
      <JsonLd data={projectsLd()} />
    </main>
  );
}
