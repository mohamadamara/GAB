export const journey = [
  {
    n: "01",
    key: "describe",
    title: "Describe",
    text: "The customer explains their business idea, problem, or software requirements — in their own words.",
    points: ["Plain-language description", "Business context and goals", "Optional files and references"],
  },
  {
    n: "02",
    key: "define",
    title: "Define",
    text: "The requirements are organised into a clearer project scope, including goals and important functionality.",
    points: ["Goals and success criteria", "Users and key features", "Priorities: must-have vs. nice-to-have"],
  },
  {
    n: "03",
    key: "discover",
    title: "Discover",
    text: "Relevant software builders and development teams can be explored, based on what the project needs.",
    points: ["Independent developers", "Development studios", "Technical teams"],
  },
  {
    n: "04",
    key: "compare",
    title: "Compare",
    text: "Customers evaluate available profiles, skills, technologies, portfolios, services, and proposals side by side.",
    points: ["Skills and technologies", "Portfolio relevance", "Proposal approach and scope"],
  },
  {
    n: "05",
    key: "choose",
    title: "Choose",
    text: "The customer selects the builder who best matches their project — with clear expectations from the start.",
    points: ["Informed decision", "Shared understanding of scope", "A defined starting point"],
  },
] as const;

export type JourneyKey = (typeof journey)[number]["key"];
