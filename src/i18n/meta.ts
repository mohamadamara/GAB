import type { Lang } from "./config";

/** <title> and meta description for pages whose body copy lives in the dictionary. */
export const pageMeta: Record<"services" | "work" | "contact", Record<Lang, { title: string; description: string }>> = {
  services: {
    en: {
      title: "Services",
      description:
        "The software GAB is being built to help you find builders for: websites, mobile apps, SaaS, CRM, ERP, booking systems, dashboards, automation, e-commerce, AI and custom software.",
    },
    he: {
      title: "שירותים",
      description:
        "איזו תוכנה תוכלו לבנות עם מפתחים דרך GAB: אתרים, אפליקציות מובייל, SaaS, מערכות CRM ו־ERP, זימון תורים, דשבורדים, אוטומציה, חנויות אונליין, AI ותוכנה בהתאמה אישית.",
    },
  },
  work: {
    en: {
      title: "Work",
      description:
        "Concept previews of the planned GAB platform: customer dashboard, project creation, builder discovery, profiles, proposal comparison, builder dashboard and administration.",
    },
    he: {
      title: "הצצה לפלטפורמה",
      description:
        "סקיצות של פלטפורמת GAB המתוכננת: לוח בקרה ללקוח, פתיחת פרויקט, חיפוש מפתחים, פרופילים, השוואת הצעות, לוח בקרה למפתח וניהול.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description: "Get in touch with GAB about general inquiries, business partnerships, developer interest or collaboration opportunities.",
    },
    he: {
      title: "צרו קשר",
      description: "דברו עם GAB: שאלות כלליות, שותפויות עסקיות, הצטרפות כמפתחים או רעיונות לשיתוף פעולה.",
    },
  },
};
