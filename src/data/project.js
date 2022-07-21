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
    description:
      "Send friends succulent stickers, available on the Apple App Store",
    tags: [
      getProjectTagByName("Xcode"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "https://www.xda-developers.com/files/2021/11/Google-Photos-Screenshots-shortcut-1024x753.jpg",
      "https://media.wired.co.uk/photos/606d9b31751ea43ccd98868e/4:3/w_2664,h_1998,c_limit/wired-screenshot.jpg",
      "https://www.androidguys.com/wp-content/uploads/2018/04/screener_1525136849196.png",
      "https://linuxhint.com/wp-content/uploads/2020/05/2-10.png",
    ],
  },
  {
    id: 1,
    title: "Chrome Commands",
    description:
      "A curated list of the best chrome URL commands, built in React",
    github: "https://github.com/willfeldman/Chrome-Commands",
    tags: [
      getProjectTagByName("React"),
      getProjectTagByName("Personal project"),
    ],
    images: [
      "https://ik.imagekit.io/feldman/chrome_commands_screenshot.png",
      "https://ik.imagekit.io/feldman/chrome_commands_vsc_screenshot.png",
      "https://ik.imagekit.io/feldman/chrome_commands_github_screenshot.png",
      "https://ik.imagekit.io/feldman/chrome_commands_product_hunt_screenshot.png",
      "https://ik.imagekit.io/feldman/chrome_commands_background.png",
    ],
  },
  {
    id: 2,
    title: "Photo Filtering Application",
    description:
      "Photo filtering app with multiple layers and effects, including Sepia, Blur, Downscale, and Mosaic",
    code: "https://drive.google.com/drive/folders/1Q0BESK_FBM1WfRHPC_vFe9fKuK7bXGbd?usp=sharing",
    tags: [getProjectTagByName("Java")],
    images: [
      "https://www.xda-developers.com/files/2021/11/Google-Photos-Screenshots-shortcut-1024x753.jpg",
      "https://media.wired.co.uk/photos/606d9b31751ea43ccd98868e/4:3/w_2664,h_1998,c_limit/wired-screenshot.jpg",
      "https://www.androidguys.com/wp-content/uploads/2018/04/screener_1525136849196.png",
      "https://linuxhint.com/wp-content/uploads/2020/05/2-10.png",
    ],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A portfolio website built in React containing experiences, accomplishments, and contact information.",
    github: "https://github.com/willfeldman/Portfolio",
    tags: [
      getProjectTagByName("React"),
      getProjectTagByName("Personal project"),
      getProjectTagByName("Adobe XD"),
    ],
    images: [
      "https://www.xda-developers.com/files/2021/11/Google-Photos-Screenshots-shortcut-1024x753.jpg",
      "https://media.wired.co.uk/photos/606d9b31751ea43ccd98868e/4:3/w_2664,h_1998,c_limit/wired-screenshot.jpg",
      "https://www.androidguys.com/wp-content/uploads/2018/04/screener_1525136849196.png",
      "https://linuxhint.com/wp-content/uploads/2020/05/2-10.png",
    ],
  },
];

export { projects };
