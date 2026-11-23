/**
 * DEMONSTRATION DATA ONLY.
 * Every name, profile, number and proposal in this file is fictional and exists purely
 * to illustrate planned GAB interfaces. None of it represents real people, companies,
 * users, transactions or marketplace activity.
 */

import type { VisualKind } from "./services";

export type DemoBuilder = {
  id: string;
  name: string;
  initials: string;
  kind: "Independent developer" | "Development studio" | "Technical team";
  location: string;
  headline: string;
  skills: string[];
  tech: string[];
  services: string[];
  relevance: number;
  availability: string;
  teamSize: string;
  portfolio: { title: string; category: string; visual: VisualKind; summary: string }[];
};

export const demoBuilders: DemoBuilder[] = [
  {
    id: "atlas-oak",
    name: "Atlas & Oak Studio",
    initials: "AO",
    kind: "Development studio",
    location: "Remote · Europe",
    headline: "Design-led studio building booking and service platforms.",
    skills: ["Booking systems", "Product design", "Web apps", "Payments"],
    tech: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Stripe"],
    services: ["Discovery & scoping", "UX/UI design", "Web development", "Maintenance"],
    relevance: 94,
    availability: "Available from next month",
    teamSize: "6 people",
    portfolio: [
      { title: "Clinic booking portal", category: "Booking system", visual: "booking", summary: "Online booking, staff calendars and SMS reminders for a multi-room clinic." },
      { title: "Studio class scheduler", category: "Mobile app", visual: "mobile", summary: "Class timetable, waitlists and memberships for a fitness studio." },
      { title: "Operations dashboard", category: "Dashboard", visual: "dashboard", summary: "Daily utilisation and revenue view across four locations." },
    ],
  },
  {
    id: "mira-k",
    name: "Mira K.",
    initials: "MK",
    kind: "Independent developer",
    location: "Remote · Flexible hours",
    headline: "Full-stack developer focused on calendars, scheduling and integrations.",
    skills: ["Calendar APIs", "Web apps", "Integrations", "Automation"],
    tech: ["Python", "Django", "Vue", "PostgreSQL", "Twilio"],
    services: ["Web development", "API integration", "Automation"],
    relevance: 88,
    availability: "Available now",
    teamSize: "Solo",
    portfolio: [
      { title: "Appointment reminders", category: "Automation", visual: "automation", summary: "Automated SMS and email reminders connected to an existing calendar." },
      { title: "Tutor scheduling", category: "SaaS", visual: "saas", summary: "Multi-tutor scheduling product with subscription plans." },
    ],
  },
  {
    id: "fieldwork",
    name: "Fieldwork Labs",
    initials: "FL",
    kind: "Technical team",
    location: "Hybrid · Middle East & Europe",
    headline: "Engineering team for larger platforms that need long-term support.",
    skills: ["Platform architecture", "Mobile apps", "ERP integration", "DevOps"],
    tech: ["Kotlin", "Swift", "Go", "React", "AWS", "Kubernetes"],
    services: ["Architecture", "Mobile development", "Cloud & DevOps", "Support contracts"],
    relevance: 81,
    availability: "Limited availability",
    teamSize: "14 people",
    portfolio: [
      { title: "Multi-site ERP link", category: "ERP", visual: "erp", summary: "Connected stock and purchasing across warehouses." },
      { title: "Field service app", category: "Mobile app", visual: "mobile", summary: "Route planning and proof-of-service for technicians." },
      { title: "Commerce backend", category: "E-commerce", visual: "ecommerce", summary: "Catalogue, stock sync and fulfilment workflows." },
    ],
  },
  {
    id: "lumen",
    name: "Lumen Byte",
    initials: "LB",
    kind: "Development studio",
    location: "Remote · North America",
    headline: "Small studio pairing practical AI with clean web products.",
    skills: ["AI features", "Web apps", "Document processing"],
    tech: ["Python", "TypeScript", "FastAPI", "React"],
    services: ["AI integration", "Web development", "Prototyping"],
    relevance: 72,
    availability: "Available in 6 weeks",
    teamSize: "4 people",
    portfolio: [{ title: "Invoice extraction", category: "AI application", visual: "ai", summary: "Field extraction from supplier invoices with human review." }],
  },
];

export const demoProposals = [
  {
    builder: "atlas-oak",
    approach: "Phased: booking MVP first, reminders and deposits in phase two.",
    timeline: "10 weeks",
    phases: 3,
    estimate: "Fixed price per phase",
    includes: ["UX design", "Web booking page", "Admin calendar", "SMS reminders", "3 months support"],
    questions: 4,
  },
  {
    builder: "mira-k",
    approach: "Single release extending the clinic's existing calendar.",
    timeline: "7 weeks",
    phases: 1,
    estimate: "Weekly rate",
    includes: ["Web booking page", "Calendar integration", "SMS reminders"],
    questions: 2,
  },
  {
    builder: "fieldwork",
    approach: "Web plus native mobile apps with a shared booking API.",
    timeline: "16 weeks",
    phases: 4,
    estimate: "Monthly retainer",
    includes: ["Architecture", "Web + iOS + Android", "Admin panel", "Analytics", "Ongoing maintenance"],
    questions: 6,
  },
] as const;

export const demoProject = {
  name: "Clinic appointment booking",
  owner: "Example business owner",
  category: "Booking & appointment system",
  description:
    "We run a small dental clinic with three practitioners. All bookings come by phone, we miss calls after 6pm, patients forget appointments, and reception spends hours every week rescheduling.",
  goals: ["Let patients book online 24/7", "Reduce missed appointments", "Free up reception time"],
  users: ["Patients", "Reception", "Practitioners", "Clinic manager"],
  must: ["Online booking page", "Practitioner calendars", "Automatic SMS & email reminders", "Reception admin view"],
  should: ["Online rescheduling & cancellation", "Deposit for new patients"],
  could: ["Patient accounts & history", "Reviews after visits"],
  integrations: ["Existing Google Calendar", "SMS provider", "Payment provider"],
  platforms: ["Responsive web", "Admin panel"],
  timeline: "Within 3 months",
  budget: "To be discussed with builders",
};
