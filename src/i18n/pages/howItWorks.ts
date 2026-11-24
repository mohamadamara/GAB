import type { Lang } from "../config";

/** Copy for /how-it-works (our process). The five steps themselves live in the dictionary (`process.steps`). */
const en = {
  metaTitle: "Our process",
  metaDescription: "How GAB builds software with you: discover, plan, design, build, launch and support — with a clear scope and regular demos.",
  eyebrow: "Our process",
  title: ["From the first conversation", "to a system that works."],
  lead: "Every project follows the same clear path. You always know what stage we're at, what comes next and what you'll get from it.",
  start: "Start a project",
  services: "See our services",
  getLabel: "What you get",
  principlesEyebrow: "What you can count on",
  principlesTitle: ["The way we work,", "in four sentences."],
  principles: [
    ["Business first", "We ask about the problem before we talk about technology."],
    ["Clear scope", "You know what's being built, in what order and for how much — before we start."],
    ["Visible progress", "Regular demos instead of long silences. You see the product grow."],
    ["We stay after launch", "Fixes, improvements and the next version — with the team that built it."],
  ],
  ctaTitle: "Ready for step one?",
  ctaText: "The first conversation is about your business, not about code. Tell us what you'd like to build.",
  ctaPrimary: "Start a project",
  ctaSecondary: "Common questions",
};

const he: typeof en = {
  metaTitle: "תהליך העבודה",
  metaDescription: "איך GAB בונה איתכם תוכנה: מבינים, מתכננים, מעצבים, בונים, משיקים ומלווים — עם הגדרה ברורה והדגמות קבועות.",
  eyebrow: "תהליך העבודה",
  title: ["מהשיחה הראשונה", "ועד מערכת שעובדת."],
  lead: "כל פרויקט עובר באותה דרך ברורה. אתם תמיד יודעים באיזה שלב אנחנו, מה הלאה ומה תקבלו ממנו.",
  start: "בואו נתחיל פרויקט",
  services: "לשירותים שלנו",
  getLabel: "מה תקבלו",
  principlesEyebrow: "על מה אפשר לסמוך",
  principlesTitle: ["איך אנחנו עובדים,", "בארבעה משפטים."],
  principles: [
    ["קודם העסק", "שואלים על הבעיה לפני שמדברים על טכנולוגיה."],
    ["הגדרה ברורה", "יודעים מה נבנה, באיזה סדר ובכמה — עוד לפני שמתחילים."],
    ["התקדמות גלויה", "הדגמות קבועות במקום שתיקות ארוכות. רואים את המוצר גדל."],
    ["נשארים גם אחרי ההשקה", "תיקונים, שיפורים והגרסה הבאה — עם הצוות שבנה את המערכת."],
  ],
  ctaTitle: "מוכנים לשלב הראשון?",
  ctaText: "השיחה הראשונה היא על העסק שלכם, לא על קוד. ספרו לנו מה תרצו לבנות.",
  ctaPrimary: "בואו נתחיל פרויקט",
  ctaSecondary: "לשאלות נפוצות",
};

export const howItWorksCopy: Record<Lang, typeof en> = { en, he };
