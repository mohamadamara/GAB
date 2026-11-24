import type { Lang } from "./config";

/** <title> and meta description for pages whose body copy lives in the dictionary. */
export const pageMeta: Record<"services" | "projects" | "contact", Record<Lang, { title: string; description: string }>> = {
  services: {
    en: {
      title: "Services",
      description:
        "What GAB builds: websites, mobile apps, SaaS platforms, CRM and ERP systems, booking systems, dashboards, automation, e-commerce, AI and custom software.",
    },
    he: {
      title: "שירותים",
      description:
        "מה GAB בונה: אתרים, אפליקציות מובייל, פלטפורמות SaaS, מערכות CRM ו־ERP, זימון תורים, דשבורדים, אוטומציה, חנויות אונליין, AI ותוכנה בהתאמה אישית.",
    },
  },
  projects: {
    en: {
      title: "Projects",
      description: "Websites, apps and business systems designed and built by GAB — the challenge, what we built and the result.",
    },
    he: {
      title: "פרויקטים",
      description: "אתרים, אפליקציות ומערכות שתכננה ובנתה GAB — האתגר, מה בנינו ומה הייתה התוצאה.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description: "Tell GAB about the website, app or system you want to build or improve.",
    },
    he: {
      title: "צרו קשר",
      description: "ספרו ל־GAB על האתר, האפליקציה או המערכת שתרצו לבנות או לשפר.",
    },
  },
};
