import type { Lang } from "../config";

/**
 * Copy for /about. `[plain, accent]` pairs render the second part in gold.
 * Deliberately free of facts we haven't confirmed (founding year, team size, client counts) —
 * add them here once they're decided.
 */
const en = {
  metaTitle: "About GAB",
  metaDescription: "GAB is a software development company that designs and builds websites, apps and business systems — and stays with them after launch.",
  eyebrow: "About GAB",
  title: ["We build the software", "your business runs on."],
  lead: "GAB is a software development company. We design and build websites, apps and business systems — and stay with them after launch.",
  storyEyebrow: "Who we are",
  quote: "“Good software starts with understanding the business — the code comes after.”",
  story: [
    "Software sits at the centre of how a business works today — how it sells, schedules, serves customers and makes decisions. When it fits, work flows. When it doesn't, people fill the gaps with spreadsheets, phone calls and copy-paste.",
    "We started GAB to build software that fits: products shaped around how each business actually works, not around a template. That means asking a lot of questions before writing code, and staying honest about what's worth building.",
    "We handle the whole journey — planning, design, development, launch and ongoing support — so you have one team that understands the system from end to end.",
  ],
  storyEnd: "Your idea, our code, one system that works.",
  missionEyebrow: "Our mission",
  mission: ["Turn business problems into software that", "people actually use."],
  visionEyebrow: "Who we work with",
  vision: "Business owners, managers and founders who know what needs to change — and want a development team that takes it from idea to a working system.",
  audiences: ["Small businesses", "Growing companies", "Founders", "Organisations", "Agencies"],
  philosophyEyebrow: "What we believe",
  philosophyTitle: ["Five principles that", "shape every project."],
  philosophy: [
    ["Technology should solve real problems.", "Software is a means, not an end. Every project starts with what needs to change for the people who'll use it."],
    ["You don't need to speak tech.", "Describe the problem in your own words — translating it into a technical plan is our job."],
    ["Clear expectations make better projects.", "An agreed scope, timeline and price protect both sides from surprises."],
    ["Show, don't tell.", "Regular demos beat status reports. You see the product as it grows and steer it early."],
    ["Quality starts with understanding.", "The most expensive code is code that solves the wrong problem. Clarity comes first."],
  ],
  ctaTitle: "Let's build something that works.",
  ctaText: "Tell us about the problem you want to solve. We'll come back with questions, an approach and a realistic plan.",
  ctaPrimary: "Start a project",
  ctaSecondary: "See our projects",
};

const he: typeof en = {
  metaTitle: "אודות GAB",
  metaDescription: "GAB היא חברה לפיתוח תוכנה שמתכננת ובונה אתרים, אפליקציות ומערכות לעסקים — ונשארת איתם גם אחרי ההשקה.",
  eyebrow: "אודות GAB",
  title: ["אנחנו בונים את התוכנה", "שהעסק שלכם רץ עליה."],
  lead: "GAB היא חברה לפיתוח תוכנה. אנחנו מתכננים ובונים אתרים, אפליקציות ומערכות לעסקים — ונשארים איתם גם אחרי ההשקה.",
  storyEyebrow: "מי אנחנו",
  quote: "״תוכנה טובה מתחילה בהבנה של העסק — הקוד מגיע אחר כך.״",
  story: [
    "תוכנה נמצאת היום בלב העבודה של כל עסק — במכירות, בתיאום פגישות, בשירות הלקוחות ובקבלת ההחלטות. כשהיא מתאימה, העבודה זורמת. כשהיא לא מתאימה, אנשים משלימים את הפערים באקסלים, בטלפונים ובהעתק־הדבק.",
    "הקמנו את GAB כדי לבנות תוכנה שמתאימה: מוצרים שנבנים סביב איך שכל עסק באמת עובד, ולא סביב תבנית. זה אומר לשאול הרבה שאלות לפני שכותבים קוד, ולהיות כנים לגבי מה באמת שווה לבנות.",
    "אנחנו לוקחים אחריות על כל הדרך — תכנון, עיצוב, פיתוח, עלייה לאוויר וליווי שוטף — כך שיש לכם צוות אחד שמכיר את המערכת מקצה לקצה.",
  ],
  storyEnd: "הרעיון שלכם, הקוד שלנו, מערכת אחת שעובדת.",
  missionEyebrow: "המשימה שלנו",
  mission: ["להפוך בעיות עסקיות לתוכנה", "שאנשים באמת משתמשים בה."],
  visionEyebrow: "עם מי אנחנו עובדים",
  vision: "בעלי עסקים, מנהלים ויזמים שיודעים מה צריך להשתנות — ורוצים צוות פיתוח שייקח את זה מרעיון ועד מערכת שעובדת.",
  audiences: ["עסקים קטנים", "חברות בצמיחה", "יזמים", "ארגונים", "משרדים וסוכנויות"],
  philosophyEyebrow: "במה אנחנו מאמינים",
  philosophyTitle: ["חמישה עקרונות", "שמנחים כל פרויקט."],
  philosophy: [
    ["טכנולוגיה צריכה לפתור בעיות אמיתיות.", "תוכנה היא אמצעי, לא מטרה. כל פרויקט מתחיל ממה שצריך להשתנות אצל האנשים שישתמשו בו."],
    ["לא צריך לדבר טכנולוגית.", "תתארו את הבעיה במילים שלכם — לתרגם אותה לתוכנית טכנית זה התפקיד שלנו."],
    ["ציפיות ברורות יוצרות פרויקטים טובים יותר.", "היקף עבודה, לוח זמנים ומחיר מוסכמים מגינים על שני הצדדים מהפתעות."],
    ["להראות, לא רק לספר.", "הדגמות קבועות עדיפות על דוחות סטטוס. רואים את המוצר גדל ומכוונים אותו מוקדם."],
    ["איכות מתחילה בהבנה.", "הקוד היקר ביותר הוא קוד שפותר את הבעיה הלא נכונה. קודם כול — בהירות."],
  ],
  ctaTitle: "בואו נבנה משהו שעובד.",
  ctaText: "ספרו לנו איזו בעיה אתם רוצים לפתור. נחזור אליכם עם שאלות, כיוון ותוכנית מציאותית.",
  ctaPrimary: "בואו נתחיל פרויקט",
  ctaSecondary: "לפרויקטים שלנו",
};

export const aboutCopy: Record<Lang, typeof en> = { en, he };
