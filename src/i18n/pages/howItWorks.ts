import type { Lang } from "../config";
import { journey } from "@/data/journey";

/** Copy for /how-it-works. `[plain, accent]` pairs render the second part in gold. */
const en = {
  metaTitle: "How It Works",
  metaDescription:
    "The GAB marketplace journey from first idea to selecting a software builder: describe, define, discover, compare, choose — with an interactive walkthrough.",
  eyebrow: "How it works",
  title: ["From the first idea", "to the right builder."],
  lead: "GAB is being designed around one clear journey. Follow a simulated project — a clinic that needs an appointment booking system — through every step.",
  start: "Start the walkthrough",
  preview: "Preview the platform",
  stepLabel: "Step",
  steps: journey.map((s): { n: string; key: string; title: string; text: string } => ({ n: s.n, key: s.key, title: s.title, text: s.text })),
  walkEyebrow: "Interactive walkthrough",
  walkTitle: ["One project.", "Five steps."],
  walkLead:
    "Use the steps or the buttons to move through the journey. Every name and number in this walkthrough is fictional and exists only to demonstrate how GAB is intended to work.",
  builderEyebrow: "Meanwhile, on the builder side",
  builderTitle: ["Clear briefs make", "better proposals."],
  builderLead: "The same structure that helps customers decide helps builders respond. Developers, studios and teams see projects that are already organised.",
  builderSide: [
    ["Build a profile", "Skills, technologies, services and working style in one consistent format."],
    ["Show your work", "Portfolio case studies that explain the problem, the solution and your role."],
    ["See relevant projects", "Opportunities organised around clear scopes that match what you do."],
    ["Propose with context", "Respond to structured briefs, so proposals start from shared understanding."],
  ],
  ctaTitle: "Have a project in mind?",
  ctaText: "GAB is not open to projects yet. Tell us what you'd like to build and we'll keep you informed as the platform develops.",
  ctaPrimary: "Register your interest",
  ctaSecondary: "Explore services",
};

const he: typeof en = {
  metaTitle: "איך זה עובד",
  metaDescription: "התהליך ב־GAB, מהרעיון הראשון ועד בחירת צוות הפיתוח: מתארים, מגדירים, מוצאים, משווים ובוחרים — עם הדגמה אינטראקטיבית.",
  eyebrow: "איך זה עובד",
  title: ["מהרעיון הראשון", "לצוות הפיתוח הנכון."],
  lead: "GAB נבנית סביב תהליך אחד וברור. בואו לעקוב אחרי פרויקט לדוגמה — מרפאה שצריכה מערכת לזימון תורים — לאורך כל השלבים.",
  start: "להתחיל את ההדגמה",
  preview: "הצצה לפלטפורמה",
  stepLabel: "שלב",
  steps: [
    { n: "01", key: "describe", title: "מתארים", text: "הלקוח מספר על הרעיון, על הבעיה העסקית או על מה שהוא צריך — במילים שלו." },
    { n: "02", key: "define", title: "מגדירים", text: "הדרישות מסתדרות להגדרת פרויקט ברורה: מטרות, ומה המערכת חייבת לעשות." },
    { n: "03", key: "discover", title: "מוצאים", text: "מוצאים מפתחים וצוותי פיתוח שמתאימים למה שהפרויקט באמת צריך." },
    { n: "04", key: "compare", title: "משווים", text: "משווים זה לצד זה פרופילים, כישורים, טכנולוגיות, תיקי עבודות, שירותים והצעות מחיר." },
    { n: "05", key: "choose", title: "בוחרים", text: "הלקוח בוחר את הצוות שהכי מתאים לפרויקט — עם ציפיות ברורות כבר מההתחלה." },
  ],
  walkEyebrow: "הדגמה אינטראקטיבית",
  walkTitle: ["פרויקט אחד.", "חמישה שלבים."],
  walkLead: "עברו בין השלבים בלחיצה על הלשוניות או על הכפתורים. כל השמות והמספרים בהדגמה בדויים, ונועדו רק להראות איך GAB אמורה לעבוד. המסכים עצמם מוצגים באנגלית.",
  builderEyebrow: "ובינתיים, אצל המפתחים",
  builderTitle: ["בריף ברור —", "הצעות טובות יותר."],
  builderLead: "אותו מבנה שעוזר ללקוחות להחליט, עוזר גם למפתחים להגיש הצעה. מפתחים, סטודיואים וצוותים מקבלים פרויקטים שכבר מסודרים.",
  builderSide: [
    ["בונים פרופיל", "כישורים, טכנולוגיות, שירותים וסגנון עבודה — באותו מבנה אצל כולם."],
    ["מציגים עבודות", "סיפורי פרויקטים שמסבירים מה הייתה הבעיה, מה הפתרון ומה היה התפקיד שלכם."],
    ["רואים פרויקטים רלוונטיים", "הזדמנויות עם הגדרה ברורה, שמתאימות למה שאתם עושים."],
    ["מגישים הצעה מבוססת", "עונים על בריף מסודר — כך שכל הצעה מתחילה מהבנה משותפת."],
  ],
  ctaTitle: "יש לכם פרויקט בראש?",
  ctaText: "GAB עוד לא פתוחה לפרויקטים. ספרו לנו מה תרצו לבנות, ונעדכן אתכם ככל שהפלטפורמה תתקדם.",
  ctaPrimary: "השאירו פרטים",
  ctaSecondary: "לכל השירותים",
};

export const howItWorksCopy: Record<Lang, typeof en> = { en, he };
