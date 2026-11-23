export type Faq = { q: string; a: string; status?: "available" | "planned" | "info" };

export const faqs: Faq[] = [
  {
    q: "What is GAB?",
    a: "GAB is a software development marketplace in development. It is designed to connect customers and businesses who need digital products — websites, apps, business systems and more — with independent developers, development studios and technical teams who can build them.",
    status: "info",
  },
  {
    q: "Is GAB already available?",
    a: "Not yet. GAB is currently being built. This website introduces the concept and shows conceptual previews of planned interfaces. You can't post projects, create builder profiles, or hire anyone through GAB today. You can register your interest through the contact page.",
    status: "info",
  },
  {
    q: "Who is GAB designed for?",
    a: "Two groups. On one side: business owners, entrepreneurs and organisations that need software built. On the other: independent developers, software studios and technical teams who build it.",
    status: "info",
  },
  {
    q: "Do I need technical knowledge?",
    a: "No. GAB is being designed so that you can start by describing your business problem in everyday language. The planned project creation process helps organise that description into goals, users and features that builders can understand.",
    status: "planned",
  },
  {
    q: "What types of software can I find builders for?",
    a: "GAB is intended to cover websites and web applications, mobile apps, SaaS platforms, CRM and ERP systems, booking and appointment systems, business dashboards, workflow automation, e-commerce, AI-powered applications and custom software.",
    status: "planned",
  },
  {
    q: "Can independent developers join?",
    a: "Yes — independent developers are a core part of the intended marketplace. Builder registration isn't open yet, but you can register your interest and we'll keep you informed.",
    status: "planned",
  },
  {
    q: "Can software development studios participate?",
    a: "Yes. GAB is being designed for builders of different sizes: independent developers, small and mid-sized studios, and larger technical teams, so customers can find a builder that suits the scale of their project.",
    status: "planned",
  },
  {
    q: "How do customers compare builders?",
    a: "The plan is for every builder to present skills, technologies, services, portfolio and availability in a consistent format, and for proposals to be compared side by side on the same criteria — approach, timeline, phases, pricing model and scope.",
    status: "planned",
  },
  {
    q: "How does GAB plan to connect customers and builders?",
    a: "Through a structured journey: customers describe their need, the requirements are organised into a clearer scope, relevant builders can be discovered, profiles and proposals compared, and the customer chooses the best fit. Matching between project scopes and builder profiles is part of the intended direction.",
    status: "planned",
  },
  {
    q: "Is GAB a development agency?",
    a: "No. GAB doesn't sell its own development services. It is being built as a marketplace — neutral ground where people who need software and people who build it can find each other.",
    status: "info",
  },
  {
    q: "Are the profiles and numbers on this website real?",
    a: "No. All builder names, profiles, proposals and figures shown in interface previews and walkthroughs are fictional demonstration data, clearly labelled as such. GAB does not yet have users, transactions or marketplace statistics to report.",
    status: "info",
  },
];
