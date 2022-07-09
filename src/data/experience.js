var experiences = [
  {
    id: 0,
    position: "Product Manager",
    company: "Blueport",
    location: "Boston, MA",
    description: [
      "Led a web performance focused 4-person scrum team in daily standups and sprint planning",
      "Regularly met and communicated with several internal and external stakeholders of projects to collaborate and gather feedback",
    ],
    dates: "Jan 2022 - Present",
    type: "Full-time",
    additionalInformation: (
      <div>
        <p>
          Northeastern has a well-established co-op program. Students often
          complete two to three co-ops prior to graduation.
        </p>
        <p>
          For my first co-op, I worked at Blueport Commerce as a Product Manager
          for 6 months. Blueport is an e-commerce platform for large furniture
          retailers. The challenges of high priced online sales are unique and
          require an omni-channel approach.
        </p>
        <p>
          When the co-op ended, Blueport offered me the opportunity to extend my
          time at the company under the position of Associate Product Manager. I
          continued working through the summer under this new role.
        </p>
        <p>
          I learned a lot during my time at Blueport. This was my first time
          working a full-time job long-term, and it was also my first time
          working in Product Management.
        </p>
        <p>
          I learned tools such as Jira and Confluence for sprint management, and
          I was exposed to how tech companies organize and prioritize work.
        </p>
        <div className="presentations">
          <div className="pdf">
            <h3 className="documentTitle">Core Web Vitals Project</h3>
            <iframe
              title="Blueport Core Web Vitals Project"
              src="https://drive.google.com/viewerng/viewer?url=https://ik.imagekit.io/feldman/core-web-vitals.pdf&embedded=true"
              frameborder="0"
            ></iframe>
          </div>
          <div className="pdf">
            <h3 className="documentTitle">Final Presentation</h3>
            <iframe
              title="Blueport Final Presentation"
              src="https://drive.google.com/viewerng/viewer?url=https://ik.imagekit.io/feldman/co-op-final-presentation.pdf&embedded=true"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    ),
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
    description: [
      "Conducted manufacturing time studies to improve accuracy of estimates in ERP system",
      "Organized and distributed drawings from the engineering team to those manufacturing the equipment",
    ],
    dates: "Jun. 2021 - Aug. 2021",
    type: "Internship",
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
    description: [
      "Installed hundreds of touchscreen Microsoft Teams enabled VoIP phones across Northeastern's Boston campus",
      "Created detailed video guides on how to operate the phone devices for university staff",
      "Removed old landlines and cleaned up associated wire closets using telecommunication equipment",
    ],
    dates: "Jan. 2021 - May 2021",
    type: "Part-time",
    additionalInformation: "",
    url: "https://its.northeastern.edu",
    linkedin:
      "https://www.linkedin.com/company/northeastern-university-information-technology-services/",
    headerImage: "https://ik.imagekit.io/feldman/its_background.jpeg",
    logo: "https://ik.imagekit.io/feldman/its_logo.jpeg",
  },
];

function getExperienceById(id) {
  return experiences.find((item) => item.id === id);
}

export { experiences, getExperienceById };
