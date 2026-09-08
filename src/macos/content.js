import { projects } from "../data/project";
import { experiences } from "../data/experience";
import { educations } from "../data/education";
import { awards } from "../data/award";
import { organizations } from "../data/organization";
export { projects, experiences, educations, awards, organizations };
export { info } from "../data/info";
export const localAsset = (url) =>
  url?.replace("https://willfeldman.com", "") || "";
export const sections = [
  { id: "home", name: "Welcome", icon: "home" },
  { id: "experience", name: "Experience", icon: "work" },
  { id: "projects", name: "Projects", icon: "folder" },
  { id: "education", name: "Education", icon: "education" },
  { id: "awards", name: "Awards", icon: "award" },
  { id: "organizations", name: "Organizations", icon: "people" },
];
export const apps = [
  { id: "finder", name: "Finder" },
  { id: "about", name: "About Will" },
  { id: "photos", name: "Photos" },
  { id: "contact", name: "Mail" },
  { id: "resume", name: "Résumé" },
  { id: "terminal", name: "Terminal" },
  { id: "settings", name: "Settings" },
];
export const photoIds = Array.from({ length: 142 }, (_, i) => 142 - i);
