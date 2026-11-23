export type VisualKind =
  | "web"
  | "mobile"
  | "saas"
  | "crm"
  | "erp"
  | "booking"
  | "dashboard"
  | "automation"
  | "ecommerce"
  | "ai"
  | "custom";

export type Service = {
  slug: string;
  code: string;
  name: string;
  short: string;
  what: string;
  problem: string;
  who: string[];
  features: string[];
  useCases: string[];
  visual: VisualKind;
};

export const services: Service[] = [
  {
    slug: "web",
    code: "WEB",
    name: "Websites & Web Applications",
    short: "From company websites to complex browser-based tools your team uses every day.",
    what: "Fast, accessible websites and full web applications that run in any browser — from a marketing presence to a multi-user portal with accounts, data, and integrations.",
    problem: "Businesses need a credible online presence and, increasingly, internal and customer-facing tools that work on any device without installation.",
    who: ["Small and growing businesses", "Startups validating a product", "Organisations replacing spreadsheets with portals"],
    features: ["Responsive layouts", "Content management", "User accounts & roles", "Forms and integrations", "SEO and performance", "Analytics"],
    useCases: ["A clinic's patient information portal", "A consultancy's lead-generating website", "A members-only resource library"],
    visual: "web",
  },
  {
    slug: "mobile",
    code: "MOB",
    name: "Mobile Applications",
    short: "Native and cross-platform apps for iOS and Android, built around real daily use.",
    what: "Applications installed on phones and tablets — built natively or with cross-platform frameworks — that use device capabilities like the camera, location, and notifications.",
    problem: "Customers and field teams expect to act from their phone. A mobile app can turn an occasional interaction into a daily habit.",
    who: ["Consumer brands", "Service businesses with field staff", "Founders building app-first products"],
    features: ["iOS & Android", "Push notifications", "Offline mode", "Camera, maps & location", "In-app payments", "App store release"],
    useCases: ["A delivery driver's route and proof-of-delivery app", "A fitness studio's class app", "A loyalty and rewards app"],
    visual: "mobile",
  },
  {
    slug: "saas",
    code: "SAS",
    name: "SaaS Platforms",
    short: "Subscription software products with accounts, billing, and multi-tenant architecture.",
    what: "Software sold as a service: one product used by many customer organisations, each with their own workspace, users, plans, and data.",
    problem: "Turning an idea into a sellable software product requires architecture decisions — tenancy, billing, security — that are expensive to get wrong.",
    who: ["Founders and product entrepreneurs", "Companies productising internal tools", "Agencies launching their own product"],
    features: ["Multi-tenant workspaces", "Subscription billing", "Team invites & permissions", "Usage metering", "Admin console", "Public API"],
    useCases: ["A scheduling product for independent tutors", "A compliance-tracking tool for small labs", "A reporting product for marketing teams"],
    visual: "saas",
  },
  {
    slug: "crm",
    code: "CRM",
    name: "CRM Systems",
    short: "Customer relationship tools shaped around how your team actually sells and serves.",
    what: "A central system for contacts, companies, conversations, and deals — custom-built or tailored so it reflects your sales process rather than forcing a generic one.",
    problem: "Customer knowledge scattered across inboxes, spreadsheets, and memory leads to missed follow-ups and lost opportunities.",
    who: ["Sales-led businesses", "Agencies and consultancies", "Teams outgrowing spreadsheets"],
    features: ["Contact & company records", "Deal pipelines", "Activity timeline", "Email integration", "Tasks & reminders", "Reporting"],
    useCases: ["A real-estate agency's buyer pipeline", "A B2B distributor's account management", "A non-profit's donor relationships"],
    visual: "crm",
  },
  {
    slug: "erp",
    code: "ERP",
    name: "ERP Systems",
    short: "Connected operations — inventory, purchasing, finance, and production in one system.",
    what: "Enterprise resource planning software that connects the operational core of a business so every department works from the same data.",
    problem: "Disconnected tools for stock, orders, and accounting create duplicate entry, errors, and no single view of the business.",
    who: ["Manufacturers and distributors", "Multi-location retailers", "Growing operations-heavy companies"],
    features: ["Inventory & warehouses", "Purchasing & suppliers", "Production planning", "Invoicing & finance", "Role-based access", "Audit trail"],
    useCases: ["A furniture workshop's production planning", "A wholesaler's multi-warehouse stock", "A food producer's batch traceability"],
    visual: "erp",
  },
  {
    slug: "booking",
    code: "BKG",
    name: "Booking & Appointment Systems",
    short: "Let customers book time, rooms, or resources — and let your team manage it calmly.",
    what: "Scheduling systems where customers choose a service, time, and staff member, with confirmations, reminders, and a management calendar for the business.",
    problem: "Phone-and-paper booking costs staff time, causes double bookings, and loses customers who want to book outside opening hours.",
    who: ["Clinics, salons, and studios", "Consultants and coaches", "Venues and rental businesses"],
    features: ["Online booking page", "Staff & resource calendars", "Automatic reminders", "Deposits & payments", "Cancellation rules", "Calendar sync"],
    useCases: ["A dental practice's appointment booking", "A co-working space's room reservations", "A tour operator's departure booking"],
    visual: "booking",
  },
  {
    slug: "dashboard",
    code: "DSH",
    name: "Business Dashboards",
    short: "Turn the data you already have into decisions you can make at a glance.",
    what: "Visual reporting tools that pull data from your existing systems and present the numbers that matter — live, filtered, and understandable.",
    problem: "Important figures live in different tools and reports are assembled by hand, so decisions are made late or on instinct.",
    who: ["Owners and managers", "Operations and finance teams", "Companies with data in many tools"],
    features: ["Data source connectors", "KPI cards & charts", "Filters and drill-downs", "Scheduled reports", "Role-based views", "Export"],
    useCases: ["A restaurant group's daily sales view", "A logistics firm's on-time delivery tracking", "A SaaS company's revenue metrics"],
    visual: "dashboard",
  },
  {
    slug: "automation",
    code: "AUT",
    name: "Workflow Automation",
    short: "Remove repetitive manual work by connecting the tools your business already uses.",
    what: "Automated workflows and integrations that move data between systems, trigger actions, and handle routine steps without human copy-and-paste.",
    problem: "Teams spend hours each week re-typing data, sending routine emails, and chasing approvals — work that software can do reliably.",
    who: ["Administrative and operations teams", "Businesses using many SaaS tools", "Anyone with repetitive processes"],
    features: ["Triggers & schedules", "System integrations", "Approval flows", "Document generation", "Notifications", "Error handling & logs"],
    useCases: ["Invoices created automatically from completed jobs", "New-hire onboarding across five tools", "Order data synced to accounting"],
    visual: "automation",
  },
  {
    slug: "ecommerce",
    code: "ECM",
    name: "E-commerce Platforms",
    short: "Online stores and ordering systems that sell clearly and run smoothly behind the scenes.",
    what: "Shops and ordering platforms — from a focused product store to marketplaces and B2B ordering portals — with catalogue, checkout, and fulfilment workflows.",
    problem: "Selling online well involves far more than a product page: payments, stock, shipping, returns, and customer communication all have to work together.",
    who: ["Retailers and brands", "Producers selling direct", "Wholesalers taking B2B orders"],
    features: ["Product catalogue", "Cart & checkout", "Payment providers", "Stock synchronisation", "Shipping & returns", "Promotions"],
    useCases: ["A ceramics studio's direct-to-customer shop", "A wholesaler's trade ordering portal", "A subscription coffee service"],
    visual: "ecommerce",
  },
  {
    slug: "ai",
    code: "AI",
    name: "AI-Powered Applications",
    short: "Practical AI features — search, assistants, document processing — built into real workflows.",
    what: "Applications that use machine learning and language models for specific, useful tasks: understanding documents, answering questions over your data, classifying, or generating drafts.",
    problem: "Many businesses see the potential of AI but need it applied to a concrete problem, with sensible safeguards, rather than as a novelty.",
    who: ["Businesses with large volumes of documents", "Support and service teams", "Product teams adding intelligent features"],
    features: ["Document extraction", "Search over your content", "Assistants & chat", "Classification & routing", "Human review steps", "Usage controls"],
    useCases: ["Extracting fields from supplier invoices", "An internal assistant for policy questions", "Routing support tickets by topic"],
    visual: "ai",
  },
  {
    slug: "custom",
    code: "CST",
    name: "Custom Software",
    short: "When your problem doesn't fit a category, software built precisely for it.",
    what: "Bespoke software designed around a specific process, industry, or idea — anything from a specialised calculation tool to a complete operational system.",
    problem: "Off-the-shelf products force compromises. Some problems are specific enough that only purpose-built software solves them properly.",
    who: ["Businesses with unique processes", "Inventors and domain experts", "Organisations replacing legacy systems"],
    features: ["Discovery & scoping", "Custom data models", "Integrations with legacy systems", "Desktop, web or embedded", "Documentation", "Long-term maintenance"],
    useCases: ["A quoting tool for a specialist engineering firm", "Replacing a 15-year-old internal database", "A lab instrument's control software"],
    visual: "custom",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
