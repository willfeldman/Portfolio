var projectTags = [
  {
    id: 0,
    name: "React",
    color: "#82D7F7",
    background: "#222222",
  },
  {
    id: 1,
    name: "JavaScript",
    color: "#ECDC68",
    background: "#323330",
  },
];

function getProjectTagById(id) {
  return projectTags.find((item) => item.id === id);
}

var projects = [
  {
    id: 0,
    title: "Portfolio website",
    description:
      "A portfolio website built in React containing experiences, accomplishments, and contact information.",
    tags: [getProjectTagById(0), getProjectTagById(1)],
  },
  {
    id: 1,
    title: "Chrome Commands",
    description: "A curated list of the best chrome URL commands",
    tags: [getProjectTagById(0), getProjectTagById(1)],
  }
];

export { projects };
