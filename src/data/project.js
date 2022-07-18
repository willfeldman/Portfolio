var projectTags = [
  {
    name: "React",
    color: "#82D7F7",
    background: "#222222",
  },
  {
    name: "JavaScript",
    color: "#323330",
    background: "#ECDC68",
  },
  {
    name: "Xcode",
    color: "#212121",
    background: "#198ee8",
  },
  {
    name: "Personal project",
    color: "#ffffff",
    background: "#004d8f",
  },
  {
    name: "Java",
    color: "#ffffff",
    background: "#5482a1",
  },
  {
    name: "Adobe XD",
    color: "#ff61f6",
    background: "#460034",
  },
];

function getProjectTagByName(name) {
  return projectTags.find((item) => item.name === name);
}

var projects = [
  {
    id: 0,
    title: "Succulent Emojis",
    description: "Send friends succulent stickers, available on the Apple App Store",
    tags: [getProjectTagByName("Xcode"), getProjectTagByName("Personal project")],
  },
  {
    id: 1,
    title: "Chrome Commands",
    description: "A curated list of the best chrome URL commands, built in React",
    tags: [getProjectTagByName("React"), getProjectTagByName("Personal project")],
  },
  {
    id: 2,
    title: "Photo Filtering Application",
    description: "Photo filtering app with multiple layers and effects, including Sepia, Blur, Downscale, and Mosaic",
    tags: [getProjectTagByName("Java")],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A portfolio website built in React containing experiences, accomplishments, and contact information.",
    github: "https://github.com/willfeldman/Portfolio",
    tags: [getProjectTagByName("React"), getProjectTagByName("Personal project"), getProjectTagByName("Adobe XD")],
  },
];

export { projects };
