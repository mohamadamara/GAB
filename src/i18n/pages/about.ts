import type { Lang } from "../config";

/** Copy for /about. `[plain, accent]` pairs render the second part in gold. */
const en = {
  metaTitle: "About GAB",
  metaDescription:
    "Why GAB exists: software is essential for modern businesses, but finding the right people to build it remains complicated. Our mission, vision and philosophy.",
  eyebrow: "About GAB",
  title: ["Bringing ideas and builders", "closer together."],
  lead: "GAB is a software development marketplace in the making — designed to connect the people who need software with the people who know how to build it.",
  storyEyebrow: "Our story",
  quote: "“Every business now needs software. Very few know how to find the people to build it.”",
  story: [
    "Software sits at the centre of how modern businesses operate — how they sell, schedule, serve customers and make decisions. Yet for most business owners, getting the right software built remains a confusing and uncertain process.",
    "The talent exists. Independent developers, development studios and technical teams around the world are ready to build. But the connection between a business need and the right builder is scattered across referrals, generic freelance platforms and agency websites — each speaking a different language.",
    "GAB began with a simple question: what if there were one place designed specifically for this connection? A place where a business problem can become a clear project, and where builders can be discovered and compared on the substance of their work.",
  ],
  storyEnd: "That place is what we're building.",
  missionEyebrow: "Our mission",
  mission: ["Make software development more accessible by connecting ideas with", "the right people."],
  visionEyebrow: "Our vision",
  vision:
    "A marketplace where businesses, entrepreneurs, independent developers, studios and technical teams can find opportunities to collaborate — with the clarity and trust that good work depends on.",
  audiences: ["Businesses", "Entrepreneurs", "Independent developers", "Studios", "Technical teams"],
  philosophyEyebrow: "Our philosophy",
  philosophyTitle: ["Five beliefs that", "shape every decision."],
  philosophy: [
    ["Technology should solve real problems.", "Software is a means, not an end. Every project on GAB starts with what needs to change for the people involved."],
    ["Great ideas should not be limited by technical knowledge.", "You shouldn't need to speak the language of frameworks to commission excellent software."],
    ["Finding the right developer should be easier.", "The right match depends on fit — skills, experience, scale and working style — and that should be visible."],
    ["Clear expectations create better projects.", "Shared definitions of scope and outcomes protect both customers and builders from misunderstanding."],
    ["Quality software starts with understanding the problem.", "The most expensive code is code that solves the wrong problem. Clarity comes first."],
  ],
  futureEyebrow: "The future of GAB",
  futureTitle: ["Where we're heading —", "honestly stated."],
  futureLead:
    "This is the intended direction of the platform. Nothing below should be read as a launched feature; plans may change as we learn from customers and builders.",
  horizon: [
    { phase: "Foundation", status: "In progress", items: ["Brand, website and product concept", "Core platform design system", "Customer and builder journeys defined"] },
    { phase: "First platform release", status: "Planned", items: ["Project creation and requirement structuring", "Builder profiles and portfolios", "Discovery and proposal comparison"] },
    { phase: "Marketplace growth", status: "Exploring", items: ["Smarter matching between projects and builders", "Collaboration tools after selection", "Support for more languages and regions"] },
  ],
  ctaTitle: "Building GAB in the open.",
  ctaText: "We're shaping the platform around real needs. Whether you'd use GAB to find a builder or to find work, your input matters now.",
  ctaPrimary: "Get in touch",
  ctaSecondary: "Preview the platform",
};

const he: typeof en = {
  metaTitle: "אודות GAB",
  metaDescription: "למה הקמנו את GAB: כל עסק צריך היום תוכנה, אבל למצוא את האנשים הנכונים שיבנו אותה עדיין מסובך. המשימה, החזון והעקרונות שלנו.",
  eyebrow: "אודות GAB",
  title: ["מקרבים בין רעיונות", "לאנשים שבונים אותם."],
  lead: "GAB היא פלטפורמה לפיתוח תוכנה שנמצאת בהקמה — והמטרה שלה פשוטה: לחבר בין מי שצריך תוכנה לבין מי שיודע לבנות אותה.",
  storyEyebrow: "הסיפור שלנו",
  quote: "״היום כל עסק צריך תוכנה. מעטים יודעים איך למצוא את מי שיבנה אותה.״",
  story: [
    "תוכנה נמצאת בלב העבודה של כל עסק מודרני — במכירות, בתיאום פגישות, בשירות הלקוחות ובקבלת ההחלטות. ובכל זאת, לרוב בעלי העסקים, הדרך לתוכנה הנכונה עדיין מבלבלת ומלאה בסימני שאלה.",
    "הכישרון קיים. מפתחים עצמאיים, סטודיואים וצוותי פיתוח בכל העולם מוכנים לעבוד. אבל הדרך מצורך עסקי אל הצוות המתאים מפוזרת בין המלצות מחברים, אתרי פרילנס כלליים ואתרים של חברות פיתוח — וכל אחד מהם מדבר בשפה אחרת.",
    "GAB התחילה משאלה אחת: מה אם היה מקום אחד שנבנה בדיוק בשביל החיבור הזה? מקום שבו בעיה עסקית הופכת לפרויקט ברור, ושבו אפשר למצוא מפתחים ולהשוות ביניהם לפי העבודה שהם עושים בפועל.",
  ],
  storyEnd: "את המקום הזה אנחנו בונים.",
  missionEyebrow: "המשימה שלנו",
  mission: ["להנגיש פיתוח תוכנה לכולם, על ידי חיבור בין רעיונות", "לאנשים הנכונים."],
  visionEyebrow: "החזון שלנו",
  vision:
    "פלטפורמה שבה עסקים, יזמים, מפתחים עצמאיים, סטודיואים וצוותי פיתוח מוצאים זה את זה ועובדים יחד — עם הבהירות והאמון שעבודה טובה צריכה.",
  audiences: ["עסקים", "יזמים", "מפתחים עצמאיים", "סטודיואים", "צוותי פיתוח"],
  philosophyEyebrow: "העקרונות שלנו",
  philosophyTitle: ["חמישה עקרונות", "שמנחים כל החלטה."],
  philosophy: [
    ["טכנולוגיה צריכה לפתור בעיות אמיתיות.", "תוכנה היא אמצעי, לא מטרה. כל פרויקט ב־GAB מתחיל ממה שצריך להשתנות אצל האנשים שמשתמשים בו."],
    ["רעיון טוב לא צריך להיתקע בגלל ידע טכני.", "לא צריך לדבר בשפה של מפתחים כדי להזמין תוכנה מצוינת."],
    ["למצוא את המפתח הנכון צריך להיות פשוט יותר.", "התאמה טובה תלויה בכישורים, בניסיון, בגודל הצוות ובסגנון העבודה — וכל זה צריך להיות גלוי."],
    ["ציפיות ברורות יוצרות פרויקטים טובים יותר.", "כשמגדירים מראש יחד את היקף העבודה ואת התוצאה, גם הלקוח וגם המפתח מוגנים מאי־הבנות."],
    ["תוכנה טובה מתחילה בהבנת הבעיה.", "הקוד היקר ביותר הוא קוד שפותר את הבעיה הלא נכונה. קודם כול — בהירות."],
  ],
  futureEyebrow: "לאן GAB הולכת",
  futureTitle: ["התוכניות שלנו —", "בלי הגזמות."],
  futureLead: "זה הכיוון שאנחנו מתכננים לפלטפורמה. שום דבר כאן הוא לא יכולת שכבר קיימת, והתוכניות עשויות להשתנות לפי מה שנלמד מלקוחות וממפתחים.",
  horizon: [
    { phase: "יסודות", status: "בעבודה", items: ["מיתוג, אתר וקונספט המוצר", "שפת העיצוב של הפלטפורמה", "הגדרת התהליך ללקוחות ולמפתחים"] },
    { phase: "גרסה ראשונה", status: "מתוכנן", items: ["פתיחת פרויקט וסידור הדרישות", "פרופילים ותיקי עבודות למפתחים", "חיפוש מפתחים והשוואת הצעות"] },
    { phase: "צמיחה", status: "בבדיקה", items: ["התאמה חכמה יותר בין פרויקטים למפתחים", "כלים לעבודה משותפת אחרי הבחירה", "תמיכה בעוד שפות ואזורים"] },
  ],
  ctaTitle: "בונים את GAB בשקיפות.",
  ctaText: "אנחנו מעצבים את הפלטפורמה לפי צרכים אמיתיים. בין אם תשתמשו ב־GAB כדי למצוא צוות פיתוח ובין אם כדי למצוא פרויקטים — עכשיו זה הזמן להשפיע.",
  ctaPrimary: "צרו קשר",
  ctaSecondary: "הצצה לפלטפורמה",
};

export const aboutCopy: Record<Lang, typeof en> = { en, he };
