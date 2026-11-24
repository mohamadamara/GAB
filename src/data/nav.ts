export type NavItem = { label: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { label: "About", href: "/about", description: "Why GAB exists" },
  { label: "Services", href: "/services", description: "What you can build" },
  { label: "How It Works", href: "/how-it-works", description: "The marketplace journey" },
  { label: "For Builders", href: "/builders", description: "Developers, studios & teams" },
  { label: "Platform", href: "/work", description: "Interface previews" },
  { label: "FAQ", href: "/faq", description: "Honest answers" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Marketplace",
    items: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Explore Services", href: "/services" },
      { label: "Platform Preview", href: "/work" },
    ],
  },
  {
    title: "Builders",
    items: [
      { label: "For Builders", href: "/builders" },
      { label: "Builder Profiles", href: "/builders#profile" },
      { label: "Register Interest", href: "/contact?topic=developer" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About GAB", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
