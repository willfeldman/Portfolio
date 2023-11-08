var projectTags = [
  {
    name: "React",
    color: "rgb(193, 198, 255)",
    background: "rgba(75, 77, 99, 0.85)",
  },
  {
    name: "JavaScript",
    color: "rgb(255, 250, 193)",
    background: "rgba(99, 97, 75, 0.85)",
  },
  {
    name: "Xcode",
    color: "rgb(193, 245, 255)",
    background: "rgba(75, 95, 99, 0.85)",
  },
  {
    name: "Personal project",
    color: "rgb(232, 193, 255)",
    background: "rgba(90, 75, 99, 0.85)",
  },
  {
    name: "Java",
    color: "rgb(255, 193, 196)",
    background: "rgba(99, 75, 76, 0.85)",
  },
  {
    name: "Adobe XD",
    color: "rgb(250, 193, 255)",
    background: "rgba(97, 75, 99, 0.85)",
  },
  {
    name: "Final Cut Pro",
    color: "rgb(229, 193, 255)",
    background: "rgba(89, 75, 99, 0.85)",
  },
  {
    name: "Class project",
    color: "rgb(201, 255, 193)",
    background: "rgba(78, 99, 75, 0.85)",
  },
  {
    name: "PHP",
    color: "rgb(193, 203, 255)",
    background: "rgba(75, 79, 99, 0.85)",
  },
  {
    name: "SQL",
    color: "rgb(255, 219, 193)",
    background: "rgba(99, 85, 75, 0.85)",
  },
  {
    name: "Jupyter",
    color: "rgb(255, 234, 193)",
    background: "rgba(99, 91, 75, 0.85)",
  },
  {
    name: "Python",
    color: "rgb(252, 255, 193)",
    background: "rgba(98, 99, 75, 0.85)",
  },
  {
    name: "Altair",
    color: "rgb(193, 247, 255)",
    background: "rgba(75, 96, 99, 0.85)",
  },
  {
    name: "Database",
    color: "rgb(255, 193, 250)",
    background: "rgba(99, 75, 97, 0.85)",
  },
  {
    name: "iOS",
    color: "rgb(255, 193, 196)",
    background: "rgba(99, 75, 76, 0.85)",
  },
  {
    name: "Artificial Intelligence",
    color: "rgb(193, 198, 255)",
    background: "rgba(75, 77, 99, 0.85)",
  },
];

function getProjectTagByName(name) {
  return projectTags.find((item) => item.name === name);
}

var projects = [
  {
    id: 0,
    title: "YouTube Vlogs",
    description:
      "Fun, light-hearted original adventure video edited on Final Cut Pro.",
    url: "https://www.youtube.com/channel/UCQOig6CGyGK7sli6MuEaf_g/videos",
    tags: [getProjectTagByName("Final Cut Pro")],
    images: [
      "/src/vlogs_fcp_screenshot.png",
      "/src/vlogs_youtube_screenshot.png",
      "/src/vlogs_video_screenshot.png",
    ],
  },
  {
    id: 1,
    title: "Grade Calculator",
    description:
      "Simple high school semester-based grade calculator made in JavaScript.",
    github: "https://github.com/willfeldman/GradeCalculator",
    tags: [
      getProjectTagByName("JavaScript"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "/src/grade_calculator_top_screenshot.png",
      "/src/grade_calculator_bottom_screenshot.png",
      "/src/grade_calculator_github_screenshot.png",
    ],
  },
  {
    id: 2,
    title: "Succulent Emojis",
    description:
      "Send friends succulent stickers, available on the Apple App Store.",
    url: "https://apps.apple.com/us/app/succulent-emojis/id1400046038",
    tags: [
      getProjectTagByName("Xcode"),
      getProjectTagByName("iOS"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "/src/succulent_xcode_screenshot.png",
      "/src/succulent_asc_screenshot.png",
      "/src/succulent_iphone_screenshot.png",
    ],
  },
  {
    id: 3,
    title: "Chrome Commands",
    description:
      "A curated list of the best chrome URL commands, built in React.",
    github: "https://github.com/willfeldman/Chrome-Commands",
    tags: [
      getProjectTagByName("React"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "/src/chrome_commands_screenshot.png",
      "/src/chrome_commands_vsc_screenshot.png",
      "/src/chrome_commands_github_screenshot.png",
      "/src/chrome_commands_product_hunt_screenshot.png",
      "/src/chrome_commands_background.png",
    ],
  },
  {
    id: 4,
    title: "Photo Filtering Application",
    description:
      "Photo filtering app with multiple layers and effects, including Sepia, Blur, Downscale, and Mosaic.",
    code: "https://drive.google.com/drive/folders/1Q0BESK_FBM1WfRHPC_vFe9fKuK7bXGbd?usp=sharing",
    tags: [getProjectTagByName("Java"), getProjectTagByName("Class project")],
    images: [
      "/src/photo_filter_class_diagram_screenshot.png",
      "/src/photo_filter_structure_screenshot.png",
      "/src/photo_filter_interface_screenshot.png",
      "/src/photo_filter_demo.gif",
    ],
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A portfolio website built in React containing experiences, accomplishments, and contact information.",
    github: "https://github.com/willfeldman/Portfolio",
    tags: [
      getProjectTagByName("React"),
      getProjectTagByName("Adobe XD"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "/src/portfolio_site_screenshot.png",
      "/src/portfolio_code_screenshot.png",
      "/src/portfolio_github_screenshot.png",
    ],
  },
  {
    id: 6,
    title: "Food Reviews",
    description:
      "A website meant for altering data from a database for a restaurant review app for college students.",
    github: "https://github.com/willfeldman/FoodReviews",
    tags: [
      getProjectTagByName("PHP"),
      getProjectTagByName("SQL"),
      getProjectTagByName("Database"),
      getProjectTagByName("Class project"),
    ],
    images: [
      "/src/food-review-structure.png",
      "/src/food-review-screenshot1.png",
      "/src/food-review-screenshot2.png",
    ],
  },
  {
    id: 7,
    title: "Bike Traffic Visualizer",
    description:
      "A website with interactive data visualizations of bike traffic in Boston.",
    github: "https://github.com/willfeldman/Bike-Traffic-Visulization",
    tags: [
      getProjectTagByName("Python"),
      getProjectTagByName("Jupyter"),
      getProjectTagByName("Altair"),
      getProjectTagByName("Class project"),
    ],
    images: [
      "/src/boston-bike-screenshot.png",
      "/src/boston-bike1.png",
      "/src/boston-bike2.png",
    ],
  },
  {
    id: 8,
    title: "Mentis",
    description:
      "A concept mental health check-in and therapy app.",
    url: "https://drive.google.com/file/d/1Pd7SpvMnEzfzILYKXJCBWZpP_pPxt6VD/view",
    tags: [
      getProjectTagByName("Final Cut Pro"),
      getProjectTagByName("Class project"),
    ],
    images: [
      "/src/mentis-1.png",
      "/src/mentis-2.png",
      "/src/mentis-3.png",
      "/src/mentis-4.png",
      "/src/mentis-5.png",
    ],
  },
  {
    id: 9,
    title: "Classmate",
    description:
      "A streamlined, intuitive class and assignment tracking app.",
    url: "https://drive.google.com/file/d/1b05NkqELtTbR-YZE8eeH2Ap7Cl-CHLhb/view?usp=sharing",
    tags: [
      getProjectTagByName("Xcode"),
      getProjectTagByName("iOS"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "/src/classmate-1.png",
      "/src/classmate-2.png",
      "/src/classmate-3.png",
      "/src/classmate-4.png",
    ],
  }
];

export { projects };
