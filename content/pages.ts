import { site } from "./site";

export const contactCopy = {
  lede: "Have something in mind, or just want to connect? The best way to reach me is email.",
  body: [
    "Write about Settle, product work, one of the projects on this site, or anything else. A sentence or two about who you are and what you have in mind is plenty to start with.",
    "I’m also on LinkedIn, and the code for many of the projects on this site is public on GitHub. My resume has the short version of everything on the Work page.",
  ],
  links: [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/feldmanwill", href: site.linkedin },
    { label: "GitHub", value: "github.com/willfeldman", href: site.github },
    { label: "Resume", value: "Google Drive", href: site.resume },
  ],
};

export const privacyCopy = {
  lede: "This site collects as little as it can: no accounts, no cookies, no advertising and no tracking across other sites.",
  updated: "Nov. 1, 2026",
  sections: [
    {
      title: "Visits",
      body: [
        "The site uses Vercel Web Analytics and Speed Insights to count page views and measure how quickly pages load. They do not use cookies, and they report visits in aggregate (pages, countries, browsers and device types) without identifying individual visitors.",
        "Like any website, the hosting provider, Vercel, keeps short-lived server logs, including IP addresses, to run and protect the service.",
      ],
    },
    {
      title: "Ask about Will",
      body: [
        "The suggested questions on the home page are answered in your browser and send nothing. A question you type is sent through the Vercel AI Gateway to an AI model (Claude by Anthropic, or a small model from Google, OpenAI or DeepSeek when Claude isn’t available) to write the answer from this site’s pages. The site does not store your questions or the answers, and it keeps your IP address only briefly in memory to limit how many questions each visitor can ask.",
        "To keep bots from flooding it, the question box uses Vercel BotID, which runs an invisible check in your browser when you send a question.",
        "Please don’t type personal or sensitive information into the question box.",
      ],
    },
    {
      title: "Email",
      body: [
        `If you email ${site.email}, I receive your address and message like any other email and use them only to reply. Nothing you send is shared or added to a mailing list.`,
      ],
    },
    {
      title: "Questions",
      body: [`For any question about privacy on this site, or to ask for something to be removed, email ${site.email}.`],
    },
  ],
};
