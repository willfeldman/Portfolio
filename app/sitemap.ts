import type { MetadataRoute } from "next";
import { experiences, projects, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    ...experiences.map((e) => `/work/${e.slug}`),
    "/projects",
    ...projects.filter((p) => p.page).map((p) => p.href),
    "/about",
    "/photos",
    "/contact",
    "/privacy",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
