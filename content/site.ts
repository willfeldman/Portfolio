// Everything the site says about Will lives here. Pages, the Markdown twins, llms.txt and the
// Ask about Will prompt all read from this file, so a fact changes in one place.

export const site = {
  name: "Will Feldman",
  url: "https://willfeldman.com",
  email: "will@willfeldman.com",
  github: "https://github.com/willfeldman",
  linkedin: "https://www.linkedin.com/in/feldmanwill/",
  resume: "https://drive.google.com/file/d/1WXwhLj-WMyd3fSoN8z3BPParTCEd4t2A/view",
  tagline: "A product person and builder at heart.",
  intro:
    "I work at the intersection of product, design, and technology — from building at Settle to turning side-project ideas into something you can use.",
  description:
    "Will Feldman is the co-founder of Settle and a former Senior Product Manager at Toast. Experience, projects, photos and how to get in touch.",
  location: "San Francisco, CA",
  memoji: "/src/will_emoji.png",
  portrait: "/src/profile.jpg",
};

export type Position = {
  title: string;
  dates: string;
  location?: string;
  summary?: string;
  bullets: string[];
};

export type Stat = { value: string; label: string };

export type Experience = {
  slug: string;
  company: string;
  range: string;
  location: string;
  logo: string;
  url?: string;
  linkedin?: string;
  summary: string;
  positions: Position[];
  stats?: Stat[];
  writeup: string[];
  documents?: { title: string; href: string }[];
};

// Newest first. Titles and dates follow Will's LinkedIn profile.
export const experiences: Experience[] = [
  {
    slug: "settle",
    company: "Settle",
    range: "Oct. 2024 – Present",
    location: "San Francisco, CA",
    logo: "/src/settle_logo.png",
    url: "https://www.usesettle.com",
    linkedin: "https://www.linkedin.com/company/usesettle/",
    summary: "Settle helps established SLED revenue teams identify and act on opportunities early.",
    positions: [
      {
        title: "Co-Founder",
        dates: "Oct. 2024 – Present",
        bullets: [
          "Shipped the core product platform for RFP Projects, Search, and a knowledge Library using AI and vector search.",
          "Helped secure several enterprise clients within the first year.",
          "Drove product adoption through iterative user feedback loops and integrations.",
        ],
      },
    ],
    writeup: [
      "Settle helps established state, local and education (SLED) revenue teams identify and act on opportunities early, before an RFP is public and while there is still time to shape it.",
      "As a co-founder, I lead product strategy, design, and growth across early customer deployments, working with a four-founder team on go-to-market, UX, and technical prioritization.",
    ],
  },
  {
    slug: "toast",
    company: "Toast",
    range: "Jan. 2023 – May 2026",
    location: "Boston, MA and San Francisco, CA",
    logo: "/src/toast_logo.jpeg",
    url: "https://pos.toasttab.com",
    linkedin: "https://www.linkedin.com/company/toast-inc/",
    summary: "Grew from Web Strategist to Senior Product Manager, building the internal sales tools behind Toast's eCommerce business.",
    positions: [
      {
        title: "Senior Product Manager",
        dates: "Apr. 2026 – May 2026",
        location: "San Francisco, CA",
        bullets: [],
      },
      {
        title: "Product Manager",
        dates: "Apr. 2025 – Apr. 2026",
        location: "Boston, MA",
        summary: "Drove the strategy and execution of internal sales tools and digital signing experiences at scale.",
        bullets: [
          "Oversaw internal tooling and digital signing experiences, including Cart Builder, an internal upsell tool that has processed over 10k deals and driven $2.7M ARR.",
          "Developed and launched Quote Builder from initial pilot to full-scale rollout, accelerating the sales cycle for over 1k new business deals.",
        ],
      },
      {
        title: "Associate Product Manager",
        dates: "June 2023 – Apr. 2025",
        location: "Boston, MA",
        summary: "Led the eCommerce prospect flow to ensure a seamless online purchasing experience.",
        bullets: [
          "Drove $120,000 ARR growth by introducing add-on terminal options and SaaS charges for eCommerce customers.",
          "Managed the pilot and discovery of Quote Builder, aimed at automating quote creation for thousands of sales reps.",
        ],
      },
      {
        title: "Web Strategist",
        dates: "Jan. 2023 – June 2023",
        location: "Boston, MA",
        summary: "Helped scope, plan, and deliver web projects to increase eCommerce sales and go-lives.",
        bullets: [
          "Sped up the response time of 600 order modifications by nearly 70%.",
          "Implemented automation initiatives that saved approximately 40 employee hours weekly.",
        ],
      },
    ],
    stats: [
      { value: "$2.7M", label: "ARR driven by Cart Builder, the internal upsell tool" },
      { value: "10k+", label: "Deals processed through Cart Builder" },
      { value: "1k+", label: "New business deals quoted with Quote Builder" },
      { value: "$120k", label: "ARR growth from add-on terminals and SaaS charges" },
    ],
    writeup: [
      "In my roles at Toast, my contributions ranged from automating complex processes to leading AI-driven initiatives, continually transforming how the eCommerce team conducts business and interacts with customers.",
      "A key achievement was the overhaul of the eCommerce reporting system. Addressing the challenges of manual tracking amidst a surge in deals, I led the development of an automated tracking and reporting system. Built on Salesforce, Google Apps Script, JavaScript, Zapier, and Salesforce Connector, it streamlines data management, significantly reduces errors, and scales to accommodate growing transaction volumes.",
      "I also optimized the deal-claiming process for the Online Sales Team. Replacing a cumbersome, multi-spreadsheet system with a single, efficient form reduced the time each team member spends on administrative tasks by 30 minutes daily, saving the team almost 38 hours per week and improving the accuracy of deal assignments.",
      "I also developed a customer chatbot that increased the customer contract task completion rate by 8%. Capable of handling 45 common queries and integrated with an automated follow-up system, it engages 11% of eCommerce customers.",
      "AI-driven projects were a highlight of my time there, including a customer-centric prototype for our company-wide hackathon that received recognition and potential prioritization.",
    ],
  },
  {
    slug: "blueport",
    company: "Blueport Commerce",
    range: "Jan. 2022 – July 2022",
    location: "Boston, MA",
    logo: "/src/blueport_logo.jpeg",
    url: "https://www.blueport.com",
    linkedin: "https://www.linkedin.com/company/blueport-commerce/",
    summary: "Product management co-op for an eCommerce platform serving large furniture retailers.",
    positions: [
      {
        title: "Product Manager Co-op",
        dates: "Jan. 2022 – July 2022",
        bullets: [
          "Led a web performance-focused 4-person scrum team that improved client performance by an average of 80.2%.",
          "Directed a $60,000 purchasing decision for software that speeds up the process of making internal tooling.",
        ],
      },
    ],
    writeup: [
      "Blueport Commerce builds eCommerce platforms for large furniture retailers, where online orders are high value and the experience has to work across every channel.",
      "I explored and recommended headless content management systems with drag-and-drop page building, so clients without technical expertise could build custom pages from Angular components. I also focused on internal tooling, such as a tool for editing menu nodes in Hub, our custom-built client system. That project ended with a purchase of Retool to speed up our development processes.",
      "I conducted Core Web Vitals tests on our clients’ product display and listing pages, analyzing scripts to identify and address performance issues, and helped decide on an automated testing service for continuous speed monitoring.",
      "A notable achievement was managing a 4-person scrum team that significantly improved Total Blocking Time on search pages with many results. For a page with 95 results, TBT dropped 74.5%, from 7.118s to 3.256s, by dividing the single search call into two separate calls and delaying one of them.",
      "I continued at Blueport as an Associate Product Manager the summer following the co-op.",
    ],
    documents: [
      { title: "Core Web Vitals project", href: "/src/documents/core-web-vitals.pdf" },
      { title: "Co-op final presentation", href: "/src/documents/coop-final-presentation.pdf" },
    ],
  },
  {
    slug: "wasserstrom",
    company: "N. Wasserstrom & Sons",
    range: "June 2021 – Aug. 2021",
    location: "Columbus, OH",
    logo: "/src/wasserstrom_logo.png",
    url: "https://www.wasserstrom.com/restaurant-supplies-equipment/n-wasserstrom-and-sons",
    linkedin: "https://www.linkedin.com/company/n-wasserstrom-sons/",
    summary: "Project intern at a food service equipment engineering and manufacturing company.",
    positions: [
      {
        title: "Project Intern",
        dates: "June 2021 – Aug. 2021",
        bullets: [
          "Improved estimate accuracy in the ERP system by conducting over 30 hours of manufacturing time studies.",
          "Coordinated the distribution of 3,000+ drawings from the engineering team to the manufacturing team.",
        ],
      },
    ],
    writeup: [
      "Wasserstrom engineers and manufactures food service equipment for clients from the largest national restaurant chains to independent restaurants, and pricing custom orders accurately is a constant challenge.",
      "My primary contribution was improving the Enterprise Resource Planning (ERP) system that generates quotes for custom orders. I spent more than 30 hours measuring the time required to construct specific parts of equipment, then organized and analyzed the observations into insights used in future project quoting.",
      "I also acted as a bridge between the engineering and manufacturing teams, ensuring both teams on site had the drawings and resources they needed to start designing and building parts.",
    ],
  },
  {
    slug: "northeastern-its",
    company: "Northeastern University ITS",
    range: "Jan. 2021 – May 2021",
    location: "Boston, MA",
    logo: "/src/its_logo.jpeg",
    url: "https://its.northeastern.edu",
    linkedin: "https://www.linkedin.com/company/northeastern-university-information-technology-services/",
    summary: "Part-time role during classes, moving the campus from landlines to VoIP.",
    positions: [
      {
        title: "Unified Communications & Technology Specialist",
        dates: "Jan. 2021 – May 2021",
        bullets: [
          "Installed and configured hundreds of touchscreen VoIP phones with integrated video conferencing across campus.",
          "Produced 10 instructional videos to guide university staff in operating new communication equipment.",
        ],
      },
    ],
    writeup: [
      "I worked part-time in Northeastern’s Information Technology Services department, while in classes, during the campus-wide transition from landlines to Voice over IP.",
      "I installed hundreds of Microsoft Teams-enabled VoIP phones across offices, classrooms, and labs, removed outdated landlines and their wiring, and produced and filmed 10 instructional guides to help the university community adopt the new system.",
      "I was mentored by a veteran telecommunications expert who had worked at Verizon for almost 30 years, and gained insight into corporate transformations and the evolution of telecommunications.",
    ],
  },
  {
    slug: "pausecircleplay",
    company: "pausecircleplay",
    range: "Aug. 2019 – Aug. 2020",
    location: "Columbus, OH",
    logo: "/src/pcp_logo.jpeg",
    url: "https://www.pausecircleplay.com/",
    linkedin: "https://www.linkedin.com/company/pausecircleplay/",
    summary: "A lifestyle and streetwear clothing brand Will started in high school.",
    positions: [
      {
        title: "Founder",
        dates: "Aug. 2019 – Aug. 2020",
        bullets: [
          "Launched and led a clothing brand that sold $7,000 worth of hand-made merchandise.",
          "Directed related business, web development, graphic design, marketing, and social media sectors.",
        ],
      },
    ],
    writeup: [
      "pausecircleplay began with a $30 investment in screen printing materials, and I taught myself the process from videos online. The name was the philosophy: pause to take a deep breath, circle to reflect, and play to live your best life.",
      "Friends helped with the first photo shoots, and the brand spread through my high school by word of mouth. I reinvested the profits in a vinyl cutting machine to add sweatshirts and crewnecks, and handled the screen printing, website, and photography myself.",
      "A feature on a nightly special from Columbus’ local news station brought orders from across the country, and sales reached $7,000. 10% of all proceeds were donated to charities. When I left for college, I made the tough decision to end the brand rather than give up making each piece by hand.",
    ],
  },
  {
    slug: "freelance",
    company: "Freelance",
    range: "Apr. 2017 – Aug. 2020",
    location: "Columbus, OH",
    logo: "/src/matt_ryan_logo.jpeg",
    url: "https://mattryandj.com",
    summary: "Websites for Columbus businesses, starting in middle school.",
    positions: [
      {
        title: "Freelance Software Engineer",
        dates: "Apr. 2017 – Aug. 2020",
        bullets: [
          "Designed and programmed websites for two local DJ companies, Matt Ryan Mobile DJ Entertainment and AUDiO-PRO Mobile DJ Entertainment, as well as several smaller companies.",
          "Communicated and met frequently with clients to display progress and make adjustments.",
        ],
      },
    ],
    writeup: [
      "I taught myself to code in middle school from YouTube videos, online tutorials, and books. The owner of Matt Ryan Mobile DJ Entertainment, one of the premier event DJs in central Ohio, noticed my work and reached out about building the company’s site.",
      "That project led to a referral to AUDiO-PRO Mobile DJ Entertainment, and then to landing pages and sites for several other Columbus companies, which I maintained and updated for years.",
    ],
  },
  {
    slug: "statapile",
    company: "StataPile: AI Quality Assurance",
    range: "June 2018 – Aug. 2018",
    location: "Chicago, IL",
    logo: "/src/statapile_logo.png",
    url: "https://statapile.com/",
    summary: "An early look at applied AI, at a firm analyzing call center recordings.",
    positions: [
      {
        title: "AI Intern",
        dates: "June 2018 – Aug. 2018",
        bullets: [
          "Formulated automated spreadsheets to analyze the accuracy of custom AI models built using consumer data.",
          "Conducted and presented research on business-to-business (B2B) growth plans to senior executives.",
        ],
      },
    ],
    writeup: [
      "StataPile analyzes call center recordings with AI for quality assurance and process optimization. I built spreadsheets for a detailed analysis of how accurately the company’s models interpreted consumer data.",
      "I also revamped the backend of the company’s website for employees, and researched business-to-business growth strategies, presenting my findings to the executive team.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  made: string;
  preGpt?: boolean;
  portrait?: boolean;
  tags: string[];
  description: string;
  image: string;
  alt: string;
  href: string;
  // Projects with their own page on this site.
  page?: boolean;
  writeup?: string[];
};

// Newest first. preGpt: made before ChatGPT launched on Nov. 30, 2022.
export const projects: Project[] = [
  {
    slug: "mindprint",
    title: "MINDPRINT",
    made: "Oct. 2026",
    tags: ["Artificial Intelligence", "Markdown", "Open source"],
    description:
      "A proposed open standard for carrying a person's perspective into AI: one reviewed MINDPRINT.md file describing how they decide, communicate, and review work.",
    image: "/img/projects/mindprint-cover.jpg",
    alt: "MINDPRINT cover: Your judgment, in a file. MINDPRINT.md, a proposed open standard for human perspective",
    href: "https://mindprint.feldman.chatgpt.site",
    writeup: [
      "MCP connects tools and Agent Skills package capabilities. MINDPRINT carries perspective: a plain Markdown file describing how a person decides, communicates and reviews work, created with AI from examples they choose to share or a guided interview.",
      "The author reviews the patterns and removes private details before sharing the file. A coworker can then ask their own AI to review a plan through that perspective. The file gives the AI a lens; it does not speak for its author.",
      "The repository publishes a v0.1 draft specification, a builder skill, a privacy review, reference tools and synthetic examples under the MIT license.",
    ],
  },
  {
    slug: "supper",
    title: "Supper",
    made: "Sept. 2026",
    portrait: false,
    tags: ["SwiftUI", "iOS", "Artificial Intelligence"],
    description:
      "A cooking companion for iPhone that turns grocery receipts into a pantry, and what you already have into something good to cook.",
    image: "/img/projects/supper-social.jpg",
    alt: "Supper on iPhone suggesting lemon and spinach orzo, then asking whether you have parmesan",
    href: "https://meetsupper.com",
    writeup: [
      "Supper scans grocery receipts into a pantry, suggests recipes from what is already in the kitchen, and answers follow-up questions while you cook, with a Live Activity for the recipe in progress.",
      "It is a native SwiftUI app with private iCloud sync, a Vercel API that verifies App Store purchases and tracks usage allowances, and AI features that only run after explicit consent. It is available on the App Store.",
    ],
  },
  {
    slug: "atlas",
    title: "Atlas",
    made: "Aug. 2026",
    tags: ["SwiftUI", "iOS", "macOS"],
    description:
      "A playful geography app for iPhone, iPad, and Mac that teaches flags, capitals, and where every country is on the map.",
    image: "/img/projects/atlas-social.jpg",
    alt: "Atlas website: Big world. Little habit. Trunk, a suitcase mascot, sits on a globe beside a Next stop: Japan card",
    href: "https://atlas.willfeldman.com",
    writeup: [
      "Atlas teaches countries through three connected clues: the flag, the capital and the location on a world map. Each region is a unit on a world tour that ends with a passport stamp, and Trunk, a suitcase mascot, cheers along the way.",
      "Missed answers come back in spaced review, questions get harder with look-alike flags and nearby capitals, and every country and capital is read aloud with recorded voices. Progress syncs through iCloud, with a guest mode so someone else can practice on your phone.",
    ],
  },
  {
    slug: "readu",
    title: "ReadU",
    made: "Oct. 2023",
    tags: ["Artificial Intelligence", "Hackathon", "Personal project"],
    description:
      "An AI reading comprehension tool for middle schoolers based on individual skills and interests.",
    image: "/img/projects/readu.jpg",
    alt: "ReadU practice review: a Main Idea question with the correct answer in green and the chosen wrong answer in red",
    href: "https://github.com/tedai-hackathon/groundbreakinglabs",
    writeup: [
      "ReadU was built for the TED AI For Good Hackathon to improve the reading comprehension of middle school students. A baseline reading measures each student's level, then ReadU writes passages that match both their skill and their interests.",
      "As students work, it adjusts the difficulty of the text and focuses questions on the skills that need practice. ReadU was a finalist in the hackathon.",
    ],
  },
  {
    slug: "classmate",
    title: "Classmate",
    made: "2023",
    portrait: true,
    page: true,
    tags: ["iOS", "Xcode", "Personal project"],
    description: "A streamlined, intuitive class and assignment tracking app.",
    image: "/img/projects/classmate-phone-1.png",
    alt: "Classmate Home screen with the next class and upcoming assignments",
    href: "/projects/classmate",
    writeup: [
      "Classmate is an iOS app designed to simplify academic organization for college students. Recognizing the clutter and complexity that often accompanies existing assignment-tracking apps, Classmate distills the process into a more approachable, user-friendly interface, free from the constraints of paywalls that limit functionality.",
      "This app is the culmination of four years of meticulous refinement of a personal workflow system, to manage assignments and class schedules effectively. The app’s development journey began with a rapid prototype, assembled in just a few weeks, which has since evolved through continuous development and optimization.",
      "The result is an efficient, adaptive tool that enhances students’ ability to stay on top of their academic lives with ease. Whether it’s managing upcoming assignments or organizing class schedules, Classmate offers a tailored experience, forged from real student life.",
    ],
  },
  {
    slug: "bike-traffic-visualizer",
    title: "Bike Traffic Visualizer",
    made: "Jan. 2023",
    tags: ["Python", "Jupyter", "Altair", "Class project"],
    description: "A website with interactive data visualizations of bike traffic in Boston.",
    image: "/img/projects/bike.jpg",
    alt: "Map of Boston bike lanes by type, with circles sized by average daily bike traffic at each intersection",
    href: "https://github.com/willfeldman/Bike-Traffic-Visulization",
  },
  {
    slug: "mentis",
    title: "Mentis",
    made: "Fall 2022",
    portrait: true,
    tags: ["Final Cut Pro", "Class project"],
    description: "A concept mental health check-in and therapy app.",
    image: "/img/projects/mentis.jpg",
    alt: "Mentis daily check-in: a How do you feel? mood picker, activity tags and Meditate, Journal and Therapy buttons",
    href: "https://drive.google.com/file/d/1Pd7SpvMnEzfzILYKXJCBWZpP_pPxt6VD/view",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    made: "July 2022",
    preGpt: true,
    tags: ["React", "Adobe XD", "Personal project"],
    description:
      "A portfolio website built in React containing experiences, accomplishments, and contact information.",
    image: "/img/projects/portfolio.jpg",
    alt: "Earlier portfolio homepage with a profile header and experience cards",
    href: "https://github.com/willfeldman/Portfolio",
  },
  {
    slug: "chrome-commands",
    title: "Chrome Commands",
    made: "Mar. 2022",
    preGpt: true,
    tags: ["React", "Personal project"],
    description: "A curated list of the best Chrome URL commands, built in React.",
    image: "/img/projects/chrome.jpg",
    alt: "Chrome Commands homepage: a grid of coloured tiles linking to chrome:// pages",
    href: "https://github.com/willfeldman/Chrome-Commands",
  },
  {
    slug: "food-reviews",
    title: "Food Reviews",
    made: "Dec. 2021",
    preGpt: true,
    tags: ["PHP", "SQL", "Database", "Class project"],
    description:
      "A website meant for altering data from a database for a restaurant review app for college students.",
    image: "/img/projects/food.jpg",
    alt: "Edit Review form in the restaurant review database app, with a Delete review button",
    href: "https://github.com/willfeldman/FoodReviews",
  },
  {
    slug: "photo-filtering-application",
    title: "Photo Filtering Application",
    made: "June 2021",
    preGpt: true,
    tags: ["Java", "Class project"],
    description:
      "Photo filtering app with multiple layers and effects, including Sepia, Blur, Downscale, and Mosaic.",
    image: "/img/projects/photofilter.jpg",
    alt: "Java photo processor with a portrait loaded, layer controls and filter buttons",
    href: "https://drive.google.com/drive/folders/1Q0BESK_FBM1WfRHPC_vFe9fKuK7bXGbd?usp=sharing",
  },
  {
    slug: "grade-calculator",
    title: "Grade Calculator",
    made: "High school",
    preGpt: true,
    tags: ["JavaScript", "Personal project"],
    description: "Simple high school semester-based grade calculator made in JavaScript.",
    image: "/img/projects/grade.jpg",
    alt: "High School Grade Calculator with quarter and exam grade inputs and a semester grade result",
    href: "https://github.com/willfeldman/GradeCalculator",
  },
  {
    slug: "youtube-vlogs",
    title: "YouTube Vlogs",
    made: "2019–2022",
    preGpt: true,
    tags: ["Final Cut Pro"],
    description: "Fun, light-hearted original adventure videos edited on Final Cut Pro.",
    image: "/img/projects/vlogs.jpg",
    alt: "YouTube player showing Day in the Life of a Northeastern Student, Last Day of Classes",
    href: "https://www.youtube.com/channel/UCQOig6CGyGK7sli6MuEaf_g/videos",
  },
  {
    slug: "succulent-emojis",
    title: "Succulent Emojis",
    made: "2018",
    preGpt: true,
    portrait: true,
    tags: ["Xcode", "iOS", "Personal project"],
    description: "Send friends succulent stickers, available on the Apple App Store.",
    image: "/img/projects/succulent.jpg",
    alt: "iMessage chat using hand-drawn succulent stickers, with the sticker drawer open",
    href: "https://apps.apple.com/us/app/succulent-emojis/id1400046038",
  },
];

// Tag colour by kind: blue = language or framework, amber = kind of project, green = tool or platform.
const languageTags = ["React", "JavaScript", "Java", "PHP", "SQL", "Python", "SwiftUI", "Markdown"];
const kindTags = ["Personal project", "Class project", "Hackathon", "Open source"];
export function tagClass(tag: string) {
  if (languageTags.includes(tag)) return "gr-badge--info";
  if (kindTags.includes(tag)) return "gr-badge--warning";
  return "gr-badge--success";
}

export const education = [
  {
    school: "Northeastern University",
    logo: "/src/northeastern_logo.jpg",
    degree: "BS in Computer Science and Business Administration",
    years: "Sept. 2020 – May 2024",
    honors: ["Summa Cum Laude", "Honors Program"],
  },
  {
    school: "Bexley High School",
    logo: "/src/bexley_high_school_logo.jpg",
    degree: "High School Diploma with Honors",
    years: "Aug. 2016 – May 2020",
    honors: ["Summa Cum Laude"],
  },
];

export const organizations = [
  {
    name: "Entrepreneurs Club",
    years: "Sept. 2020 – May 2024",
    logo: "/src/eclub_logo.png",
    summary: "Educating, inspiring, and empowering the world’s future entrepreneurs, innovators, and leaders.",
    roles: [
      { title: "Director of Technology", years: "May 2023 – May 2024" },
      { title: "Associate Director of Technology", years: "Dec. 2022 – May 2023" },
      { title: "Photographer", years: "May 2022 – Dec. 2022" },
    ],
  },
  {
    name: "Bexleo Student Yearbook",
    years: "Aug. 2017 – July 2020",
    logo: "/src/bexleo_logo.png",
    summary: "Bexley High School’s top-rated yearbook program.",
    roles: [
      { title: "Co-Executive Editor", years: "Aug. 2019 – July 2020" },
      { title: "Website Editor", years: "Aug. 2017 – May 2019" },
    ],
  },
  {
    name: "Key Club",
    years: "Aug. 2016 – May 2020",
    logo: "/src/key_club_logo.png",
    summary: "International, student-led organization that provides its members with opportunities to provide service.",
    roles: [
      { title: "President", years: "Aug. 2018 – May 2020" },
      { title: "Vice President", years: "Aug. 2017 – May 2018" },
    ],
  },
  {
    name: "CISV Columbus",
    years: "Jan. 2016 – June 2020",
    logo: "/src/cisv_logo.png",
    summary: "Educates and inspires action for a more just and peaceful world.",
    roles: [
      { title: "Social Media Marketing", years: "Aug. 2018 – May 2020" },
      { title: "Vice President", years: "Aug. 2017 – May 2018" },
    ],
  },
  {
    name: "Student Council",
    years: "Aug. 2017 – May 2020",
    logo: "/src/student_council_logo.jpeg",
    summary: "Elected to represent students to school administration.",
    roles: [{ title: "Junior Class Vice President", years: "Aug. 2018 – May 2019" }],
  },
];

export const awards = [
  {
    name: "National AP Scholar",
    issuer: "College Board",
    date: "July 2020",
    detail: "Average score of at least 4 on all AP Exams taken, with 4 or higher on eight or more",
  },
  {
    name: "AP Scholar with Distinction",
    issuer: "College Board",
    date: "July 2019, July 2020",
    detail: "Average score of at least 3.5 on all AP Exams taken, with 3 or higher on five or more",
  },
  {
    name: "Faculty Award",
    issuer: "Bexley High School",
    date: "May 2020",
    detail: "Given annually by the school staff to the two most well-rounded students in the graduating class",
  },
  {
    name: "Sara Pfaff Photojournalism Cup",
    issuer: "Bexley High School",
    date: "May 2020",
    detail: "Presented to the senior executive editors in charge of the Bexleo yearbook publication",
  },
];

// Will's photos, numbered 1–142 in public/src/ig.
export const photoCount = 142;
export const photo = (n: number) => `/src/ig/${n}.webp`;
export const featuredPhotos = [142, 138, 134, 130, 126, 122, 120, 116, 110, 104, 100, 96, 90, 84, 80, 76];
