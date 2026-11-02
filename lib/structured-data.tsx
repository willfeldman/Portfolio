import { education, experiences, projects, site } from "@/content/site";

const current = experiences[0];

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    mainEntity: {
      "@type": "Person",
      "@id": `${site.url}/#will`,
      name: site.name,
      url: site.url,
      image: `${site.url}${site.portrait}`,
      email: `mailto:${site.email}`,
      jobTitle: current.positions[0].title,
      worksFor: { "@type": "Organization", name: current.company, url: current.url },
      alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
      address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA" },
      sameAs: [site.linkedin, site.github],
    },
  };
}

export function projectsLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${site.name}`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        dateCreated: p.made,
        keywords: p.tags.join(", "),
        url: p.href.startsWith("/") ? `${site.url}${p.href}` : p.href,
        creator: { "@id": `${site.url}/#will` },
      },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
