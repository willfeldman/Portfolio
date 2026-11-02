"use client";

import { useState } from "react";
import { projects } from "@/content/site";
import { Icon } from "./Icon";
import { ProjectCard } from "./ProjectCard";

export function ProjectSearch() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const items = projects.filter(
    (p) => !q || [p.title, p.description, p.made, ...p.tags].join(" ").toLowerCase().includes(q),
  );
  return (
    <>
      <div className="row-wrap" style={{ gap: 12 }}>
        <label className="search">
          <Icon name="search" size={16} />
          <span className="sr-only">Search projects</span>
          <input type="search" placeholder="Search projects" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>
      <div className="card-grid">
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {items.length === 0 && (
        <div className="empty">
          <p style={{ fontSize: 16, lineHeight: "24px", fontWeight: 500 }}>No projects match that search</p>
          <p className="small muted">Try a tool like React or Python, or clear the search.</p>
        </div>
      )}
    </>
  );
}
