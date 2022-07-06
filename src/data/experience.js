var experiences = [
  {
    id: 0,
    position: "Product Manager",
    company: "Blueport",
    location: "Boston, MA",
    description: ["Led a web performance focused 4-person scrum team in daily standups and sprint planning", "Regularly met and communicated with several internal and external stakeholders of projects to collaborate and gather feedback"],
    dates: "Jan 2022 - Present",
    additionalInformation: "",
    url: "https://www.blueport.com",
    linkedin: "https://www.linkedin.com/company/blueport-commerce/",
    headerImage: "https://ik.imagekit.io/feldman/blueport_header.png",
    logo: "https://ik.imagekit.io/feldman/blueport_logo.jpeg",
  },
  {
    id: 1,
    position: "ERP Project Intern",
    company: "N. Wasserstrom & Sons",
    location: "Columbus, OH",
    description: ["Conducted manufacturing time studies to improve accuracy of estimates in ERP system", "Organized and distributed drawings from the engineering team to those manufacturing the equipment"],
    dates: "Jun. 2021 - Aug. 2021",
    additionalInformation: "",
    url: "https://www.wasserstrom.com/restaurant-supplies-equipment/n-wasserstrom-and-sons",
    linkedin: "https://www.linkedin.com/company/n-wasserstrom-sons/",
    headerImage: "https://ik.imagekit.io/feldman/wasserstrom_header.png",
    logo: "https://ik.imagekit.io/feldman/wasserstrom_logo.jpeg",
  },
  {
    id: 2,
    position: "UC & Microsoft Teams Calls Assistant",
    company: "Northeastern University ITS",
    location: "Boston, MA",
    description: ["Installed hundreds of touchscreen Microsoft Teams enabled VoIP phones across Northeastern's Boston campus", "Created detailed video guides on how to operate the phone devices for university staff", "Removed old landlines and cleaned up associated wire closets using telecommunication equipment"],
    dates: "Jan. 2021 - May 2021",
    additionalInformation: "",
    url: "https://its.northeastern.edu",
    linkedin: "https://www.linkedin.com/company/northeastern-university-information-technology-services/",
    headerImage: "https://ik.imagekit.io/feldman/its_background.jpeg",
    logo: "https://ik.imagekit.io/feldman/its_logo.jpeg",
  }
];

function getExperienceById(id) {
  return experiences.find((item) => item.id === id);
}

export { experiences, getExperienceById };