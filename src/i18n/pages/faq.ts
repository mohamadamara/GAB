import type { Lang } from "../config";
import { faqs, type Faq } from "@/data/faq";

/** Copy for /faq. Question order and status labels match `src/data/faq.ts`. */
const en = {
  metaTitle: "FAQ",
  metaDescription: "Honest answers about GAB: what it is, who it's for, what's available today and what's planned.",
  eyebrow: "FAQ",
  title: ["Honest answers,", "clearly labelled."],
  lead: "Each answer is marked as either describing GAB itself or describing planned functionality. Nothing on this page refers to a feature that is live today.",
  statusEyebrow: "Current status",
  statusTitle: "The platform is in development.",
  statusText: "You can explore the concept and register interest today. Posting projects and builder registration will come later.",
  ask: "Ask another question",
  preview: "Preview the platform",
  labels: { available: "Available now", planned: "Planned", info: "About GAB" },
  items: faqs,
};

const heItems: Faq[] = [
  {
    q: "מה זה GAB?",
    a: "GAB היא פלטפורמה לפיתוח תוכנה שנמצאת בהקמה. היא נועדה לחבר בין לקוחות ועסקים שצריכים מוצר דיגיטלי — אתר, אפליקציה, מערכת לניהול העסק ועוד — לבין מפתחים עצמאיים, סטודיואים וצוותי פיתוח שיכולים לבנות אותו.",
    status: "info",
  },
  {
    q: "אפשר כבר להשתמש ב־GAB?",
    a: "עדיין לא. GAB נמצאת בבנייה. האתר הזה מציג את הרעיון וסקיצות של הממשקים המתוכננים. כרגע אי אפשר לפרסם פרויקטים, לפתוח פרופיל מפתח או להעסיק מישהו דרך GAB — אבל אפשר להשאיר פרטים בעמוד יצירת הקשר.",
    status: "info",
  },
  {
    q: "למי GAB מיועדת?",
    a: "לשני צדדים. מצד אחד: בעלי עסקים, יזמים וארגונים שצריכים תוכנה. מצד שני: מפתחים עצמאיים, סטודיואים וצוותי פיתוח שבונים אותה.",
    status: "info",
  },
  {
    q: "צריך ידע טכני?",
    a: "לא. GAB מתוכננת כך שתתחילו פשוט מלתאר את הבעיה העסקית שלכם, בשפה יומיומית. תהליך פתיחת הפרויקט המתוכנן יעזור להפוך את התיאור הזה למטרות, משתמשים ופיצ׳רים שמפתחים יבינו.",
    status: "planned",
  },
  {
    q: "לאיזה סוגי תוכנה אפשר למצוא מפתחים?",
    a: "התוכנית היא לכסות אתרים ואפליקציות ווב, אפליקציות מובייל, פלטפורמות SaaS, מערכות CRM ו־ERP, מערכות לזימון תורים, דשבורדים עסקיים, אוטומציה של תהליכים, חנויות אונליין, אפליקציות AI ותוכנה בהתאמה אישית.",
    status: "planned",
  },
  {
    q: "מפתחים עצמאיים יכולים להצטרף?",
    a: "בהחלט — מפתחים עצמאיים הם חלק מרכזי בפלטפורמה. ההרשמה עוד לא נפתחה, אבל אפשר להשאיר פרטים ונעדכן אתכם.",
    status: "planned",
  },
  {
    q: "גם סטודיואים לפיתוח יכולים להשתתף?",
    a: "כן. GAB מתוכננת למפתחים בכל גודל: עצמאיים, סטודיואים קטנים ובינוניים וצוותי פיתוח גדולים — כדי שכל לקוח ימצא צוות שמתאים להיקף הפרויקט שלו.",
    status: "planned",
  },
  {
    q: "איך לקוחות ישוו בין מפתחים?",
    a: "התוכנית היא שכל מפתח יציג כישורים, טכנולוגיות, שירותים, תיק עבודות וזמינות באותו מבנה, ושהצעות המחיר יוצגו זו לצד זו לפי אותם קריטריונים: גישה, לוח זמנים, שלבים, מודל תמחור והיקף.",
    status: "planned",
  },
  {
    q: "איך GAB תחבר בין לקוחות למפתחים?",
    a: "דרך תהליך מסודר: הלקוח מתאר את הצורך, הדרישות מסתדרות להגדרה ברורה, מוצאים מפתחים רלוונטיים, משווים פרופילים והצעות — והלקוח בוחר את ההתאמה הטובה ביותר. התאמה אוטומטית בין הגדרת הפרויקט לפרופילים של המפתחים היא חלק מהכיוון המתוכנן.",
    status: "planned",
  },
  {
    q: "GAB היא חברת פיתוח?",
    a: "לא. GAB לא מוכרת שירותי פיתוח בעצמה. היא נבנית כפלטפורמה ניטרלית — מקום שבו מי שצריך תוכנה ומי שבונה תוכנה מוצאים זה את זה.",
    status: "info",
  },
  {
    q: "הפרופילים והמספרים באתר אמיתיים?",
    a: "לא. כל שמות המפתחים, הפרופילים, ההצעות והמספרים שמופיעים בסקיצות ובהדגמות בדויים, ומסומנים ככאלה. ל־GAB עדיין אין משתמשים, עסקאות או נתונים לדווח עליהם.",
    status: "info",
  },
];

const he: typeof en = {
  metaTitle: "שאלות נפוצות",
  metaDescription: "תשובות ישירות על GAB: מה זה, למי זה מיועד, מה קיים היום ומה מתוכנן.",
  eyebrow: "שאלות נפוצות",
  title: ["תשובות ישירות,", "בלי אותיות קטנות."],
  lead: "ליד כל תשובה כתוב אם היא מתארת את GAB עצמה או יכולת שמתוכננת בעתיד. שום דבר בעמוד הזה לא מתאר יכולת שכבר פעילה היום.",
  statusEyebrow: "איפה אנחנו עומדים",
  statusTitle: "הפלטפורמה בפיתוח.",
  statusText: "כבר עכשיו אפשר להכיר את הרעיון ולהשאיר פרטים. פרסום פרויקטים והרשמה למפתחים יגיעו בהמשך.",
  ask: "יש לי שאלה אחרת",
  preview: "הצצה לפלטפורמה",
  labels: { available: "זמין עכשיו", planned: "מתוכנן", info: "על GAB" },
  items: heItems,
};

export const faqCopy: Record<Lang, typeof en> = { en, he };
